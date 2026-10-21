const GRAPHQL_ENDPOINT = 'https://api.github.com/graphql'
const MAX_WEEKS = 52
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000

const CONTRIBUTION_LEVELS = [
  'NONE',
  'FIRST_QUARTILE',
  'SECOND_QUARTILE',
  'THIRD_QUARTILE',
  'FOURTH_QUARTILE',
]

function formatIsoDate(date) {
  return date.toISOString().slice(0, 10)
}

function parseIsoDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null
  }

  const date = new Date(`${value}T00:00:00.000Z`)
  return Number.isNaN(date.getTime()) ? null : date
}

function startOfUtcWeek(date) {
  const start = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  )
  start.setUTCDate(start.getUTCDate() - start.getUTCDay())
  return start
}

function addUtcDays(date, days) {
  const next = new Date(date)
  next.setUTCDate(next.getUTCDate() + days)
  return next
}

function toLevelNumber(value) {
  const index = CONTRIBUTION_LEVELS.indexOf(value)

  if (index >= 0) return index

  throw new Error(
    `GitHub devolvió un nivel de contribución desconocido: ${String(value)}.`
  )
}

/**
 * Returns the inclusive 52-week window ending today. The period starts on a
 * Sunday so the grid columns always line up with full weeks.
 */
export function getContributionPeriod(now = new Date()) {
  const end = new Date(
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
  )
  const currentWeekStart = startOfUtcWeek(end)
  const start = addUtcDays(currentWeekStart, -(MAX_WEEKS - 1) * 7)

  return { start, end }
}

/**
 * Converts GitHub's GraphQL contribution calendar into the small public
 * payload consumed by the portfolio. Only date, count and intensity are kept.
 */
export function buildContributionSnapshot(
  calendar,
  { now = new Date(), start, end } = {}
) {
  if (!calendar || !Array.isArray(calendar.weeks)) {
    throw new Error('La respuesta de GitHub no contiene un calendario válido.')
  }

  const period = start && end ? { start, end } : getContributionPeriod(now)
  const startKey = formatIsoDate(period.start)
  const endKey = formatIsoDate(period.end)
  const millisecondsPerDay = MILLISECONDS_PER_DAY

  const seenDates = new Set()
  const weeks = []

  for (const week of calendar.weeks) {
    if (!week || !Array.isArray(week.contributionDays)) {
      throw new Error('El calendario de GitHub contiene una semana incompleta.')
    }

    const days = Array(7).fill(null)

    for (const rawDay of week.contributionDays) {
      if (!rawDay || typeof rawDay !== 'object') {
        throw new Error('El calendario de GitHub contiene un día inválido.')
      }

      const date = rawDay.date
      const parsedDate = parseIsoDate(date)

      if (!parsedDate) {
        throw new Error('El calendario de GitHub contiene una fecha inválida.')
      }

      // GitHub can pad the first/last week with days outside the requested
      // interval. Those cells must not leak into the published period.
      if (date < startKey || date > endKey) continue

      if (seenDates.has(date)) {
        throw new Error(`El calendario de GitHub repite la fecha ${date}.`)
      }

      const count = Number(rawDay.contributionCount)
      const weekday = Number(rawDay.weekday)

      if (!Number.isInteger(count) || count < 0) {
        throw new Error(
          `El calendario de GitHub contiene un conteo inválido en ${date}.`
        )
      }

      if (!Number.isInteger(weekday) || weekday < 0 || weekday > 6) {
        throw new Error(
          `El calendario de GitHub contiene un día de semana inválido en ${date}.`
        )
      }

      if (days[weekday]) {
        throw new Error(`El calendario de GitHub duplica el día ${date}.`)
      }

      days[weekday] = {
        date,
        count,
        level: toLevelNumber(rawDay.contributionLevel),
      }
      seenDates.add(date)
    }

    if (days.some(Boolean)) {
      weeks.push({ days })
    }
  }

  // GitHub may return 53 columns when the range starts in the middle of a
  // week. The portfolio always displays the most recent 52 complete columns.
  const visibleWeeks = weeks.slice(-MAX_WEEKS)
  const visibleDays = visibleWeeks
    .flatMap((week) => week.days.filter(Boolean))
    .sort((a, b) => a.date.localeCompare(b.date))

  if (visibleWeeks.length !== MAX_WEEKS) {
    throw new Error(
      `GitHub devolvió ${visibleWeeks.length} semanas; se esperaban ${MAX_WEEKS}. No se sobrescribe el snapshot.`
    )
  }

  const firstVisibleDate = visibleDays[0]?.date
  const lastVisibleDate = visibleDays[visibleDays.length - 1]?.date
  const lastVisibleDateValue = lastVisibleDate
    ? parseIsoDate(lastVisibleDate)
    : null

  if (firstVisibleDate !== startKey || !lastVisibleDateValue) {
    throw new Error(
      'El calendario no cubre el periodo solicitado. No se sobrescribe el snapshot.'
    )
  }

  const expectedVisibleDays =
    Math.floor(
      (lastVisibleDateValue.getTime() - period.start.getTime()) /
        millisecondsPerDay
    ) + 1
  const daysBehind = Math.floor(
    (period.end.getTime() - lastVisibleDateValue.getTime()) / millisecondsPerDay
  )

  // A run near midnight UTC can see the profile's local calendar one day
  // behind. Allow that single trailing boundary, but never internal gaps or
  // larger truncation.
  if (
    visibleDays.length !== expectedVisibleDays ||
    daysBehind < 0 ||
    daysBehind > 1
  ) {
    throw new Error(
      `El calendario está incompleto (${visibleDays.length} días; último ${lastVisibleDate}). No se sobrescribe el snapshot.`
    )
  }

  return {
    version: 1,
    generatedAt: now.toISOString(),
    period: {
      from: startKey,
      to: lastVisibleDate,
    },
    totalContributions: visibleDays.reduce((sum, day) => sum + day.count, 0),
    weeks: visibleWeeks,
  }
}

async function fetchContributionCalendar({
  token,
  login,
  start,
  end,
  fetchImpl = fetch,
  endpoint = GRAPHQL_ENDPOINT,
}) {
  const query = `
    query PortfolioContributionCalendar(
      $login: String!
      $from: DateTime!
      $to: DateTime!
    ) {
      user(login: $login) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            weeks {
              contributionDays {
                date
                contributionCount
                contributionLevel
                weekday
              }
            }
          }
        }
      }
    }
  `

  let response

  try {
    response = await fetchImpl(endpoint, {
      method: 'POST',
      headers: {
        Accept: 'application/vnd.github+json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'User-Agent': 'capv-portfolio-contributions',
      },
      body: JSON.stringify({
        query,
        variables: {
          login,
          from: `${formatIsoDate(start)}T00:00:00.000Z`,
          to: `${formatIsoDate(end)}T23:59:59.999Z`,
        },
      }),
      signal: AbortSignal.timeout(30000),
    })
  } catch (error) {
    throw new Error(
      `No se pudo conectar con la API GraphQL de GitHub: ${error.message}`
    )
  }

  if (!response.ok) {
    throw new Error(`GitHub GraphQL respondió con el estado ${response.status}.`)
  }

  let payload

  try {
    payload = await response.json()
  } catch {
    throw new Error('GitHub GraphQL devolvió una respuesta que no es JSON.')
  }

  if (Array.isArray(payload?.errors) && payload.errors.length > 0) {
    const messages = payload.errors
      .map((error) => error?.message)
      .filter(Boolean)
      .join(' ')
    throw new Error(`GitHub GraphQL devolvió un error: ${messages}`)
  }

  const calendar =
    payload?.data?.user?.contributionsCollection?.contributionCalendar

  if (!calendar) {
    throw new Error(
      'La respuesta de GitHub no contiene contributionCalendar para el usuario indicado.'
    )
  }

  return calendar
}

export async function generateContributionSnapshot({
  token,
  login = 'Charles-X-Core',
  now = new Date(),
  fetchImpl,
  endpoint,
} = {}) {
  if (!token) {
    throw new Error(
      'No hay token de contribuciones. Configura GITHUB_CONTRIBUTIONS_TOKEN en Vercel o CONTRIBUTIONS_TOKEN en GitHub Actions.'
    )
  }

  const { start, end } = getContributionPeriod(now)
  const calendar = await fetchContributionCalendar({
    token,
    login,
    start,
    end,
    fetchImpl,
    endpoint,
  })

  return buildContributionSnapshot(calendar, { now, start, end })
}
