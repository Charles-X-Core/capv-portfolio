import { generateContributionSnapshot } from '../lib/githubContributions.js'

const SUCCESS_CACHE_CONTROL =
  'public, max-age=0, s-maxage=900, stale-while-revalidate=86400'
const ERROR_CACHE_CONTROL = 'no-store'
const SERVER_CACHE_TTL_MS = 15 * 60 * 1000
const ALLOWED_ORIGIN =
  process.env.GITHUB_CONTRIBUTIONS_ALLOWED_ORIGIN?.trim() || ''

let serverCache = null

function applyCors(request, response) {
  const origin = request.headers?.origin

  if (!ALLOWED_ORIGIN || origin !== ALLOWED_ORIGIN) return

  response.setHeader('Access-Control-Allow-Origin', origin)
  response.setHeader('Access-Control-Allow-Methods', 'GET, HEAD, OPTIONS')
  response.setHeader('Access-Control-Allow-Headers', 'Accept, Content-Type')
  response.setHeader('Vary', 'Origin')
}

function sendJson(
  response,
  statusCode,
  payload,
  { cacheControl = ERROR_CACHE_CONTROL, includeBody = true } = {}
) {
  const body = JSON.stringify(payload)

  response.statusCode = statusCode
  response.setHeader('Content-Type', 'application/json; charset=utf-8')
  response.setHeader('Cache-Control', cacheControl)
  response.setHeader('X-Content-Type-Options', 'nosniff')
  response.end(includeBody ? body : undefined)
}

export default async function handler(request, response) {
  applyCors(request, response)

  if (request.method === 'OPTIONS') {
    response.statusCode = 204
    response.end()
    return
  }

  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.setHeader('Allow', 'GET, HEAD, OPTIONS')
    sendJson(response, 405, {
      error: {
        code: 'method-not-allowed',
        message: 'Método no permitido.',
      },
    })
    return
  }

  const token = process.env.GITHUB_CONTRIBUTIONS_TOKEN?.trim()
  const login = process.env.GITHUB_LOGIN?.trim() || 'Charles-X-Core'

  if (!token) {
    sendJson(response, 503, {
      error: {
        code: 'not-configured',
        message:
          'El servicio de contribuciones no tiene configurado su token de GitHub.',
      },
    })
    return
  }

  const now = Date.now()

  if (serverCache && now - serverCache.savedAt < SERVER_CACHE_TTL_MS) {
    sendJson(response, 200, serverCache.data, {
      cacheControl: SUCCESS_CACHE_CONTROL,
      includeBody: request.method !== 'HEAD',
    })
    return
  }

  try {
    const snapshot = await generateContributionSnapshot({ token, login })
    serverCache = { data: snapshot, savedAt: Date.now() }

    sendJson(response, 200, snapshot, {
      cacheControl: SUCCESS_CACHE_CONTROL,
      includeBody: request.method !== 'HEAD',
    })
  } catch (error) {
    // Vercel logs this server-side. Never include the token or the request
    // headers in the log or in the public response.
    console.error(
      '[github-contributions] No se pudo generar la actividad:',
      error instanceof Error ? error.message : 'Error desconocido'
    )

    sendJson(response, 502, {
      error: {
        code: 'upstream',
        message:
          'No se pudo consultar la actividad pública de GitHub en este momento.',
      },
    })
  }
}
