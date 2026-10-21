import { useEffect, useState } from 'react'
import { GITHUB_PROFILE_URL } from '../../data/engineeringCore.data'
import { useInView } from '../../hooks/useInView'
import { fetchGitHubSummary } from '../../services/github.service'
import {
  CodeIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  GitHubIcon,
  RepoIcon,
} from './EngineeringCoreIcons'
import ContributionCalendar from './ContributionCalendar'
import './EngineeringCore.css'

const numberFormatter = new Intl.NumberFormat('es-PE')
const percentageFormatter = new Intl.NumberFormat('es-PE', {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
})
const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  dateStyle: 'medium',
  timeStyle: 'short',
})

function formatNumber(value) {
  return Number.isFinite(value) ? numberFormatter.format(value) : '—'
}

function formatPercentage(value) {
  return Number.isFinite(value) ? `${percentageFormatter.format(value)} %` : '—'
}

function formatDate(value) {
  if (!value) return 'Fecha no disponible'

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Fecha no disponible'
    : dateFormatter.format(date)
}

function ProfileLink() {
  return (
    <a
      className="ec-profile-link"
      href={GITHUB_PROFILE_URL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <GitHubIcon className="ec-profile-icon" />
      <span>Ver perfil en GitHub</span>
      <ExternalLinkIcon className="ec-external-icon" />
    </a>
  )
}

function LoadingState() {
  return (
    <div className="ec-loading" role="status">
      <p className="ec-loading-text">Cargando datos públicos de GitHub…</p>
      <div className="ec-skeleton-stats" aria-hidden="true">
        <span />
        <span />
        <span />
      </div>
      <div className="ec-skeleton-panels" aria-hidden="true">
        <span />
        <span />
      </div>
    </div>
  )
}

function ErrorState({ error }) {
  const resetAt = error?.rateLimit?.resetAt

  return (
    <div className="ec-state ec-state--error" role="alert">
      <h3>No se pudieron cargar los datos</h3>
      <p>
        GitHub no respondió o limitó temporalmente las solicitudes. Puedes
        consultar el perfil directamente.
      </p>
      {error?.rateLimit?.limited && resetAt && (
        <p className="ec-error-reset">
          La cuota de GitHub se restablece el {formatDate(resetAt)}.
        </p>
      )}
      <ProfileLink />
    </div>
  )
}

export default function EngineeringCore() {
  const [sectionRef, isInView] = useInView({
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.12,
  })
  const [status, setStatus] = useState('loading')
  const [data, setData] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    let active = true

    fetchGitHubSummary()
      .then((summary) => {
        if (!active) return
        setData(summary)
        setStatus('ready')
      })
      .catch((loadError) => {
        if (!active) return
        setError(loadError)
        setStatus('error')
      })

    return () => {
      active = false
    }
  }, [])

  const profileUrl = data?.profile?.htmlUrl || GITHUB_PROFILE_URL
  const publicCount = data?.repositories?.publicCount
  const originalCount = data?.repositories?.originalCount
  const primaryLanguageCount = data?.repositories?.primaryLanguageCount
  const languageItems = data?.languages?.items ?? []
  const featuredRepositories = data?.featured ?? []
  const warnings = data?.warnings ?? []
  const languageSampleCount =
    data?.languages?.reposTotal ?? featuredRepositories.length

  return (
    <section
      id="engineering-core"
      ref={sectionRef}
      className={`engineering-core ${isInView ? 'is-visible' : ''}`.trim()}
      aria-labelledby="engineering-core-title"
      aria-busy={status === 'loading'}
    >
      <header className="ec-header">
        <div className="ec-heading">
          <div className="ec-heading-top">
            <span className="ec-github-badge" aria-hidden="true">
              <GitHubIcon />
            </span>
            <span className="ec-eyebrow">Actividad pública</span>
          </div>
          <h2 id="engineering-core-title" className="ec-title">
            Engineering Core
          </h2>
          <p className="ec-subtitle">
            Datos reales de GitHub: repositorios, composición del código y
            proyectos públicos.
          </p>
        </div>

        <div className="ec-header-side">
          {status === 'ready' && data && (
            <p className="ec-updated">
              Actualizado{' '}
              <time dateTime={data.fetchedAt}>
                {formatDate(data.fetchedAt)}
              </time>
            </p>
          )}
          <ProfileLink />
        </div>
      </header>

      {status === 'loading' && <LoadingState />}

      {status === 'error' && <ErrorState error={error} />}

      {status === 'ready' && data && (
        <>
          {warnings.length > 0 && (
            <div className="ec-notice" role="status">
              <strong>Datos parciales.</strong> {warnings.join(' ')}
              {data.rateLimit?.limited && data.rateLimit.resetAt && (
                <span className="ec-notice-reset">
                  La cuota de GitHub se restablece el{' '}
                  {formatDate(data.rateLimit.resetAt)}. Vuelve a cargar la página
                  después de esa hora.
                </span>
              )}
            </div>
          )}

          <dl className="ec-stats">
            <div className="ec-stat ec-stat--public">
              <span className="ec-stat-icon" aria-hidden="true">
                <RepoIcon />
              </span>
              <div className="ec-stat-copy">
                <dt>Repositorios públicos</dt>
                <dd>{formatNumber(publicCount)}</dd>
              </div>
            </div>
            <div className="ec-stat ec-stat--original">
              <span className="ec-stat-icon" aria-hidden="true">
                <GitBranchIcon />
              </span>
              <div className="ec-stat-copy">
                <dt>Repositorios originales</dt>
                <dd>{formatNumber(originalCount)}</dd>
              </div>
            </div>
            <div className="ec-stat ec-stat--languages">
              <span className="ec-stat-icon" aria-hidden="true">
                <CodeIcon />
              </span>
              <div className="ec-stat-copy">
                <dt>Lenguajes principales</dt>
                <dd>{formatNumber(primaryLanguageCount)}</dd>
              </div>
            </div>
          </dl>
        </>
      )}

      <ContributionCalendar />

      {status === 'ready' && data && (
        <>
          <div className="ec-content-grid">
            <section
              className="ec-panel ec-panel--languages ec-languages"
              aria-labelledby="ec-languages-title"
            >
              <div className="ec-panel-header">
                <h3 id="ec-languages-title" className="ec-panel-title">
                  Lenguajes por código
                </h3>
                <p className="ec-panel-note">
                  Muestra de {languageSampleCount || '—'} repositorios
                </p>
              </div>

              {languageItems.length > 0 ? (
                <>
                  <ul className="ec-language-list">
                    {languageItems.map((language, index) => (
                      <li
                        className="ec-language-row"
                        key={language.name}
                        style={{
                          '--ec-bar-color': language.color,
                          '--ec-bar-width': `${language.percent}%`,
                          '--ec-bar-index': index,
                        }}
                      >
                        <div className="ec-language-meta">
                          <span className="ec-language-name">
                            <span
                              className="ec-language-dot"
                              aria-hidden="true"
                            />
                            {language.name}
                          </span>
                          <span className="ec-language-value">
                            {formatPercentage(language.percent)}
                          </span>
                        </div>
                        <div
                          className="ec-language-track"
                          aria-hidden="true"
                        >
                          <span className="ec-language-fill" />
                        </div>
                      </li>
                    ))}
                  </ul>

                  <p className="ec-source-note">
                    {data.languages.isPartial
                      ? `Muestra parcial: ${data.languages.reposConsulted} de ${data.languages.reposTotal} repositorios destacados.`
                      : `Muestra de ${data.languages.reposConsulted} repositorios destacados.`}{' '}
                    No representa la totalidad del perfil. Fuente: API pública de
                    GitHub.
                  </p>
                </>
              ) : (
                <p className="ec-empty">
                  No hay datos de lenguajes disponibles.
                </p>
              )}
            </section>

            <section
              className="ec-panel ec-panel--featured ec-featured"
              aria-labelledby="ec-featured-title"
            >
              <div className="ec-panel-header">
                <h3 id="ec-featured-title" className="ec-panel-title">
                  Repositorios destacados
                </h3>
                <p className="ec-panel-note">Selección editorial</p>
              </div>

              {featuredRepositories.length > 0 ? (
                <div className="ec-repo-grid">
                  {featuredRepositories.map((repository) => (
                    <article className="ec-repo-card" key={repository.name}>
                      <h4 className="ec-repo-name">
                        <a
                          href={repository.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Abrir ${repository.name} en GitHub`}
                        >
                          {repository.name}
                        </a>
                      </h4>

                      <p className="ec-repo-description">
                        {repository.description || 'Sin descripción pública.'}
                      </p>

                      <div className="ec-repo-footer">
                        <span className="ec-repo-language">
                          {repository.language || 'Sin lenguaje principal'}
                        </span>
                        <a
                          className="ec-repo-link"
                          href={repository.htmlUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Ver ${repository.name} en GitHub`}
                        >
                          <GitHubIcon className="ec-repo-icon" />
                          <span>Ver repositorio</span>
                          <ExternalLinkIcon className="ec-repo-external" />
                        </a>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <p className="ec-empty">
                  No hay repositorios destacados disponibles.
                </p>
              )}
            </section>
          </div>

          <p className="ec-source-note ec-profile-source">
            Perfil consultado:{' '}
            <a
              href={profileUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubIcon className="ec-inline-icon" />
              {data.profile?.login || 'Charles-X-Core'}
            </a>
            . Los datos pueden cambiar después de la fecha de actualización.
          </p>
        </>
      )}
    </section>
  )
}
