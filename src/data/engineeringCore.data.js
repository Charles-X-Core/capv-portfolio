export const GITHUB_USERNAME = 'Charles-X-Core'

export const GITHUB_PROFILE_URL = `https://github.com/${GITHUB_USERNAME}`

export const GITHUB_API_BASE = 'https://api.github.com'

/**
 * Selección editorial de repositorios destacados.
 * Cambiar este array es suficiente para modificar las tarjetas.
 *
 * La distribución de lenguajes se calcula únicamente sobre esta muestra para
 * mantener el consumo de la API pública dentro de un margen razonable.
 */
export const FEATURED_REPOSITORIES = [
  'odontologia-sistema',
  'TubeToAlbum',
  'Track-Pays',
]

export const LANGUAGE_BAR_COLORS = [
  '#2563eb',
  '#38bdf8',
  '#60a5fa',
  '#818cf8',
  '#22d3ee',
]

export const OTHER_LANGUAGE_COLOR = '#64748b'

export const SUMMARY_CACHE_TTL_MS = 10 * 60 * 1000
export const PARTIAL_SUMMARY_CACHE_TTL_MS = 2 * 60 * 1000
export const LANGUAGE_CACHE_TTL_MS = 30 * 60 * 1000
export const FAILURE_CACHE_TTL_MS = 60 * 1000

export const LANGUAGE_FETCH_CONCURRENCY = 3
