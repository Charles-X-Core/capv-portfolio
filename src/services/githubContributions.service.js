const API_BASE_URL = (
  import.meta.env?.VITE_CONTRIBUTIONS_API_URL ?? ''
).replace(/\/+$/, '')
const API_PATH = `${API_BASE_URL}/api/github-contributions`
const SNAPSHOT_PATH = 'data/github-contributions.json'
const SUCCESS_CACHE_TTL_MS = 15 * 60 * 1000
const FAILURE_CACHE_TTL_MS = 60 * 1000
const MAX_WEEKS = 52

let activityCache = null
let activityInflight = null
let activityFailure = null

export class ContributionSnapshotError extends Error {
  constructor(message, code, cause) {
    super(message)
    this.name = 'ContributionSnapshotError'
    this.code = code
    if (cause) this.cause = cause
  }
}

function isValidIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return false
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  return (
    !Number.isNaN(date.getTime()) &&
    date.toISOString().slice(0, 10) === value
  )
}

function normalizeLevel(level, count) {
  if (count === 0) return 0

  if (Number.isInteger(level) && level >= 1 && level <= 4) {
    return level
  }

  if (count < 2) return 1
  if (count < 5) return 2
  if (count < 10) return 3
  return 4
}

function normalizeDay(value) {
  if (!value || typeof value !== 'object' || !isValidIsoDate(value.date)) {
    return null
  }

  const count = Number(value.count ?? value.contributionCount)

  if (!Number.isInteger(count) || count < 0) {
    return null
  }

  return {
    date: value.date,
    count,
    level: normalizeLevel(
      typeof value.level === 'number' ? value.level : NaN,
      count
    ),
  }
}

/**
 * Validates a generated payload before it reaches React. Invalid or incomplete
 * data is rejected instead of being displayed as real activity.
 */
export function normalizeContributionSnapshot(raw, source = 'snapshot') {
  if (!raw || typeof raw !== 'object' || !Array.isArray(raw.weeks)) {
    throw new ContributionSnapshotError(
      'La actividad de contribuciones no tiene el formato esperado.',
      'invalid'
    )
  }

  if (raw.weeks.length < MAX_WEEKS) {
    throw new ContributionSnapshotError(
      'La actividad de contribuciones está incompleta.',
      'invalid'
    )
  }

  const weeks = raw.weeks.slice(-MAX_WEEKS).map((week) => {
    if (
      !week ||
      typeof week !== 'object' ||
      !Array.isArray(week.days) ||
      week.days.length !== 7
    ) {
      throw new ContributionSnapshotError(
        'La actividad de contribuciones contiene una semana inválida.',
        'invalid'
      )
    }

    const days = Array(7)
      .fill(null)
      .map((_, index) => normalizeDay(week.days[index]))

    return { days }
  })

  const visibleDays = weeks
    .flatMap((week) => week.days)
    .filter(Boolean)
    .sort((a, b) => a.date.localeCompare(b.date))

  if (visibleDays.length === 0) {
    throw new ContributionSnapshotError(
      'La actividad de contribuciones no contiene días.',
      'invalid'
    )
  }

  if (visibleDays.length < 350) {
    throw new ContributionSnapshotError(
      'La actividad de contribuciones está incompleta.',
      'invalid'
    )
  }

  const generatedAtDate = raw.generatedAt ? new Date(raw.generatedAt) : null
  const generatedAt =
    generatedAtDate && !Number.isNaN(generatedAtDate.getTime())
      ? generatedAtDate.toISOString()
      : null

  return {
    version: Number.isInteger(raw.version) ? raw.version : 1,
    source,
    generatedAt,
    period: {
      from: visibleDays[0].date,
      to: visibleDays[visibleDays.length - 1].date,
    },
    totalContributions: visibleDays.reduce((sum, day) => sum + day.count, 0),
    weeks,
  }
}

async function readApiErrorCode(response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) return null

  try {
    const body = await response.json()
    return body?.error?.code ?? null
  } catch {
    return null
  }
}

async function loadFromApi() {
  let response

  try {
    response = await fetch(API_PATH, {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (error) {
    throw new ContributionSnapshotError(
      'No se pudo conectar con el servicio de contribuciones.',
      'network',
      error
    )
  }

  if (!response.ok) {
    if (response.status === 404 || response.status === 405) {
      throw new ContributionSnapshotError(
        'El servicio de contribuciones no está disponible.',
        'not-found'
      )
    }

    const code = await readApiErrorCode(response)

    if (response.status === 503 && code === 'not-configured') {
      throw new ContributionSnapshotError(
        'El servicio de contribuciones no está configurado.',
        'not-configured'
      )
    }

    throw new ContributionSnapshotError(
      `El servicio de contribuciones respondió con el estado ${response.status}.`,
      'http'
    )
  }

  let raw

  try {
    raw = await response.json()
  } catch (error) {
    const contentType = response.headers.get('content-type') ?? ''

    if (contentType.includes('text/html')) {
      throw new ContributionSnapshotError(
        'El servicio de contribuciones no está disponible.',
        'not-found',
        error
      )
    }

    throw new ContributionSnapshotError(
      'El servicio de contribuciones no devolvió un JSON válido.',
      'invalid',
      error
    )
  }

  return normalizeContributionSnapshot(raw, 'api')
}

async function loadSnapshot() {
  const baseUrl = import.meta.env?.BASE_URL ?? '/'
  let response

  try {
    response = await fetch(`${baseUrl}${SNAPSHOT_PATH}`, {
      cache: 'no-cache',
      headers: {
        Accept: 'application/json',
      },
    })
  } catch (error) {
    throw new ContributionSnapshotError(
      'No se pudo conectar con el snapshot de contribuciones.',
      'network',
      error
    )
  }

  if (response.status === 404) {
    throw new ContributionSnapshotError(
      'El snapshot de contribuciones todavía no está publicado.',
      'not-found'
    )
  }

  if (!response.ok) {
    throw new ContributionSnapshotError(
      `El snapshot de contribuciones respondió con el estado ${response.status}.`,
      'http'
    )
  }

  let raw

  try {
    raw = await response.json()
  } catch (error) {
    const contentType = response.headers.get('content-type') ?? ''

    if (contentType.includes('text/html')) {
      throw new ContributionSnapshotError(
        'El snapshot de contribuciones todavía no está publicado.',
        'not-found',
        error
      )
    }

    throw new ContributionSnapshotError(
      'El snapshot de contribuciones no es un JSON válido.',
      'invalid',
      error
    )
  }

  return normalizeContributionSnapshot(raw, 'snapshot')
}

async function loadActivity() {
  let apiError

  try {
    return await loadFromApi()
  } catch (error) {
    apiError = error
  }

  try {
    return await loadSnapshot()
  } catch (snapshotError) {
    if (
      snapshotError.code === 'not-found' &&
      (apiError.code === 'not-configured' || apiError.code === 'not-found')
    ) {
      throw new ContributionSnapshotError(
        'Todavía no hay actividad de contribuciones publicada.',
        'not-found',
        apiError
      )
    }

    throw apiError
  }
}

export function fetchContributionSnapshot() {
  const now = Date.now()

  if (activityCache && now - activityCache.savedAt < SUCCESS_CACHE_TTL_MS) {
    return Promise.resolve(activityCache.data)
  }

  if (activityFailure && now < activityFailure.until) {
    return Promise.reject(activityFailure.error)
  }

  if (activityInflight) {
    return activityInflight
  }

  activityInflight = loadActivity()
    .then((data) => {
      activityCache = { data, savedAt: Date.now() }
      activityFailure = null
      return data
    })
    .catch((error) => {
      activityFailure = {
        error,
        until: Date.now() + FAILURE_CACHE_TTL_MS,
      }
      throw error
    })
    .finally(() => {
      activityInflight = null
    })

  return activityInflight
}

export function clearContributionSnapshotCache() {
  activityCache = null
  activityFailure = null
  activityInflight = null
}
