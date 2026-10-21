import {
  FAILURE_CACHE_TTL_MS,
  FEATURED_REPOSITORIES,
  GITHUB_API_BASE,
  GITHUB_USERNAME,
  LANGUAGE_BAR_COLORS,
  LANGUAGE_CACHE_TTL_MS,
  LANGUAGE_FETCH_CONCURRENCY,
  OTHER_LANGUAGE_COLOR,
  PARTIAL_SUMMARY_CACHE_TTL_MS,
  SUMMARY_CACHE_TTL_MS,
} from '../data/engineeringCore.data.js'

const DEFAULT_RATE_LIMIT_BACKOFF_MS = 60 * 1000

let summaryCache = null
let summaryInflight = null
let summaryFailure = null

const languageCache = new Map()
const languageInflight = new Map()

const rateLimitState = {
  limit: null,
  remaining: null,
  resetAt: null,
  blockedUntil: 0,
}

function getRateLimitSnapshot() {
  return {
    limit: rateLimitState.limit,
    remaining: rateLimitState.remaining,
    resetAt: rateLimitState.resetAt,
    limited: Date.now() < rateLimitState.blockedUntil,
  }
}

function createContext() {
  const snapshot = getRateLimitSnapshot()

  return {
    limited: snapshot.limited,
    rateLimit: snapshot,
  }
}

function blockRateLimit(until) {
  rateLimitState.blockedUntil = Math.max(
    rateLimitState.blockedUntil,
    until || 0,
    Date.now() + 1000
  )
}

function updateRateLimit(response, context) {
  const limit = Number.parseInt(response.headers.get('x-ratelimit-limit') ?? '', 10)
  const remaining = Number.parseInt(
    response.headers.get('x-ratelimit-remaining') ?? '',
    10
  )
  const reset = Number.parseInt(response.headers.get('x-ratelimit-reset') ?? '', 10)

  if (Number.isFinite(limit)) rateLimitState.limit = limit
  if (Number.isFinite(remaining)) rateLimitState.remaining = remaining
  if (Number.isFinite(reset)) {
    rateLimitState.resetAt = new Date(reset * 1000).toISOString()
    if (remaining === 0) {
      blockRateLimit(new Date(reset * 1000).getTime())
    }
  } else if (remaining === 0) {
    blockRateLimit(Date.now() + DEFAULT_RATE_LIMIT_BACKOFF_MS)
  }

  context.rateLimit = getRateLimitSnapshot()
  if (context.rateLimit.limited) {
    context.limited = true
  }
}

function createGitHubError(status, message, rateLimit = null) {
  const error = new Error(message)
  error.status = status
  error.rateLimit = rateLimit
  return error
}

async function requestJson(path, context) {
  if (Date.now() < rateLimitState.blockedUntil) {
    context.limited = true
    context.rateLimit = getRateLimitSnapshot()
    throw createGitHubError(
      429,
      'GitHub limitó temporalmente las solicitudes.',
      context.rateLimit
    )
  }

  let response

  try {
    response = await fetch(`${GITHUB_API_BASE}${path}`, {
      headers: {
        Accept: 'application/vnd.github+json',
      },
    })
  } catch (error) {
    const wrapped = createGitHubError(
      null,
      'No se pudo conectar con GitHub.',
      getRateLimitSnapshot()
    )
    wrapped.cause = error
    throw wrapped
  }

  updateRateLimit(response, context)

  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      const retryAfter = Number.parseInt(
        response.headers.get('retry-after') ?? '',
        10
      )
      const resetAt = rateLimitState.resetAt
        ? new Date(rateLimitState.resetAt).getTime()
        : NaN
      const until = Number.isFinite(retryAfter)
        ? Date.now() + retryAfter * 1000
        : Number.isFinite(resetAt)
          ? resetAt
          : Date.now() + DEFAULT_RATE_LIMIT_BACKOFF_MS

      blockRateLimit(Math.max(until, Date.now() + 1000))
      context.limited = true
      context.rateLimit = getRateLimitSnapshot()
      throw createGitHubError(
        response.status,
        'GitHub limitó temporalmente las solicitudes.',
        context.rateLimit
      )
    }

    throw createGitHubError(
      response.status,
      `GitHub respondió con el estado ${response.status}.`,
      context.rateLimit
    )
  }

  return response.json()
}

async function mapWithConcurrency(items, limit, mapper) {
  const results = new Array(items.length)
  let cursor = 0

  const workers = Array.from(
    { length: Math.min(limit, items.length) },
    async () => {
      while (cursor < items.length) {
        const index = cursor
        cursor += 1
        results[index] = await mapper(items[index], index)
      }
    }
  )

  await Promise.allSettled(workers)
  return results
}

function buildLanguages(languageResults) {
  const totals = new Map()
  let successful = 0
  let stale = 0

  for (const result of languageResults) {
    if (!result || result.status !== 'fulfilled') continue
    successful += 1
    if (result.stale) stale += 1

    for (const [name, bytes] of Object.entries(result.data ?? {})) {
      if (!Number.isFinite(bytes) || bytes <= 0) continue
      totals.set(name, (totals.get(name) ?? 0) + bytes)
    }
  }

  if (totals.size === 0) {
    return null
  }

  const totalBytes = [...totals.values()].reduce((sum, bytes) => sum + bytes, 0)
  const sorted = [...totals.entries()]
    .map(([name, bytes]) => ({ name, bytes }))
    .sort((a, b) => b.bytes - a.bytes)

  const top = sorted.slice(0, 5).map((language, index) => ({
    ...language,
    percent: Number(((language.bytes / totalBytes) * 100).toFixed(1)),
    color: LANGUAGE_BAR_COLORS[index] ?? OTHER_LANGUAGE_COLOR,
  }))

  const topBytes = top.reduce((sum, language) => sum + language.bytes, 0)
  const otherBytes = totalBytes - topBytes

  if (otherBytes > 0) {
    top.push({
      name: 'Otros',
      bytes: otherBytes,
      percent: Number(((otherBytes / totalBytes) * 100).toFixed(1)),
      color: OTHER_LANGUAGE_COLOR,
    })
  }

  return {
    totalBytes,
    items: top,
    reposConsulted: successful,
    reposTotal: languageResults.length,
    staleRepositories: stale,
    isPartial: successful < languageResults.length,
    isStale: stale > 0,
  }
}

function findFeaturedRepositories(repositories) {
  return FEATURED_REPOSITORIES.map((name) =>
    repositories.find((repository) => repository.name === name)
  ).filter(Boolean)
}

function toFeaturedRepository(repository) {
  return {
    name: repository.name,
    description: repository.description,
    language: repository.language,
    htmlUrl: repository.html_url,
    pushedAt: repository.pushed_at,
    stargazersCount: repository.stargazers_count,
  }
}

function uniqueWarnings(warnings) {
  return [...new Set(warnings.filter(Boolean))]
}

async function getRepositoryLanguages(repository, context) {
  const key = repository.name.toLowerCase()
  const now = Date.now()
  const cached = languageCache.get(key)

  if (cached?.data && now - cached.savedAt < LANGUAGE_CACHE_TTL_MS) {
    return { data: cached.data, stale: false }
  }

  if (cached?.error && now - cached.savedAt < FAILURE_CACHE_TTL_MS) {
    throw cached.error
  }

  if (
    cached?.data &&
    cached.failedAt &&
    now - cached.failedAt < FAILURE_CACHE_TTL_MS
  ) {
    return { data: cached.data, stale: true }
  }

  if (context.limited) {
    if (cached?.data) return { data: cached.data, stale: true }
    throw createGitHubError(
      429,
      'GitHub limitó temporalmente las solicitudes.',
      context.rateLimit
    )
  }

  if (languageInflight.has(key)) {
    return languageInflight.get(key)
  }

  const request = (async () => {
    try {
      const data = await requestJson(
        `/repos/${GITHUB_USERNAME}/${encodeURIComponent(repository.name)}/languages`,
        context
      )
      languageCache.set(key, { data, savedAt: Date.now() })
      return { data, stale: false }
    } catch (error) {
      if (cached?.data) {
        languageCache.set(key, {
          ...cached,
          failedAt: Date.now(),
        })
        return { data: cached.data, stale: true }
      }

      languageCache.set(key, { error, savedAt: Date.now() })
      throw error
    }
  })()

  languageInflight.set(key, request)

  try {
    return await request
  } finally {
    languageInflight.delete(key)
  }
}

async function loadGitHubSummary() {
  const context = createContext()
  const warnings = []

  const [profileResult, repositoriesResult] = await Promise.allSettled([
    requestJson(`/users/${GITHUB_USERNAME}`, context),
    requestJson(
      `/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      context
    ),
  ])

  const profile =
    profileResult.status === 'fulfilled' ? profileResult.value : null
  const repositories =
    repositoriesResult.status === 'fulfilled' &&
    Array.isArray(repositoriesResult.value)
      ? repositoriesResult.value
      : null

  if (!profile) {
    warnings.push('No se pudo cargar el perfil público.')
  }

  if (!repositories) {
    warnings.push('No se pudieron cargar los repositorios públicos.')
    if (!profile) {
      const error = createGitHubError(
        context.limited ? 403 : null,
        'No se pudieron cargar los datos públicos de GitHub.',
        context.rateLimit
      )
      throw error
    }

    return {
      fetchedAt: new Date().toISOString(),
      profile: {
        login: profile.login,
        name: profile.name || profile.login,
        publicRepos: profile.public_repos ?? null,
        htmlUrl: profile.html_url,
      },
      repositories: {
        publicCount: profile.public_repos ?? null,
        originalCount: null,
        withContentCount: null,
        primaryLanguageCount: null,
      },
      languages: null,
      featured: [],
      warnings: uniqueWarnings(warnings),
      rateLimit: context.rateLimit,
    }
  }

  const originalRepositories = repositories.filter(
    (repository) => !repository.fork
  )
  const repositoriesWithContent = originalRepositories.filter(
    (repository) => repository.size > 0
  )
  const primaryLanguages = new Set(
    originalRepositories
      .map((repository) => repository.language)
      .filter(Boolean)
  )

  const featuredRepositories = findFeaturedRepositories(repositories)
  const languageSample = featuredRepositories.filter(
    (repository) => repository.size > 0
  )

  const languageResults = await mapWithConcurrency(
    languageSample,
    LANGUAGE_FETCH_CONCURRENCY,
    async (repository) => {
      if (context.limited) {
        return { status: 'skipped', name: repository.name }
      }

      try {
        const { data, stale } = await getRepositoryLanguages(repository, context)
        return { status: 'fulfilled', name: repository.name, data, stale }
      } catch (error) {
        return { status: 'rejected', name: repository.name, error }
      }
    }
  )

  const languages = buildLanguages(languageResults)
  const failedLanguageRequests = languageResults.filter(
    (result) => result?.status !== 'fulfilled'
  ).length

  if (failedLanguageRequests > 0) {
    warnings.push(
      `No se pudieron consultar los lenguajes de ${failedLanguageRequests} de ${languageResults.length} repositorios destacados.`
    )
  }

  if (languages?.isStale) {
    warnings.push(
      'Se reutilizaron los últimos datos válidos de lenguajes disponibles.'
    )
  }

  const hasPartialData =
    failedLanguageRequests > 0 || !languages || !profile || !repositories

  if (context.limited && hasPartialData) {
    warnings.push(
      'GitHub limitó temporalmente las solicitudes; se muestran los datos disponibles.'
    )
  }

  return {
    fetchedAt: new Date().toISOString(),
    profile: {
      login: profile?.login ?? GITHUB_USERNAME,
      name: profile?.name || profile?.login || GITHUB_USERNAME,
      publicRepos: profile?.public_repos ?? repositories.length,
      htmlUrl: profile?.html_url ?? `https://github.com/${GITHUB_USERNAME}`,
    },
    repositories: {
      publicCount: profile?.public_repos ?? repositories.length,
      originalCount: originalRepositories.length,
      withContentCount: repositoriesWithContent.length,
      primaryLanguageCount: primaryLanguages.size,
    },
    languages,
    featured: featuredRepositories.map(toFeaturedRepository),
    warnings: uniqueWarnings(warnings),
    rateLimit: context.rateLimit,
  }
}

function staleSummary(error) {
  return {
    ...summaryCache.data,
    warnings: uniqueWarnings([
      ...summaryCache.data.warnings,
      'No se pudieron actualizar los datos; se muestra la última consulta disponible.',
    ]),
    rateLimit: error?.rateLimit ?? summaryCache.data.rateLimit,
  }
}

async function loadWithCacheFallback() {
  try {
    const data = await loadGitHubSummary()
    summaryCache = { data, savedAt: Date.now() }
    summaryFailure = null
    return data
  } catch (error) {
    summaryFailure = {
      error,
      until: Date.now() + FAILURE_CACHE_TTL_MS,
    }

    if (summaryCache) {
      return staleSummary(error)
    }

    throw error
  }
}

export function fetchGitHubSummary() {
  const now = Date.now()
  const summaryTtl = summaryCache?.data?.warnings?.length
    ? PARTIAL_SUMMARY_CACHE_TTL_MS
    : SUMMARY_CACHE_TTL_MS

  if (summaryCache && now - summaryCache.savedAt < summaryTtl) {
    return Promise.resolve(summaryCache.data)
  }

  if (summaryFailure && now < summaryFailure.until) {
    if (summaryCache) {
      return Promise.resolve(staleSummary(summaryFailure.error))
    }

    return Promise.reject(summaryFailure.error)
  }

  if (summaryInflight) {
    return summaryInflight
  }

  summaryInflight = loadWithCacheFallback().finally(() => {
    summaryInflight = null
  })

  return summaryInflight
}
