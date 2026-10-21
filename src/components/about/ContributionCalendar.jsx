import {
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { GITHUB_PROFILE_URL } from '../../data/engineeringCore.data'
import { fetchContributionSnapshot } from '../../services/githubContributions.service'
import { ExternalLinkIcon, GitHubIcon } from './EngineeringCoreIcons'
import './ContributionCalendar.css'

const numberFormatter = new Intl.NumberFormat('es-PE')
const dayFormatter = new Intl.DateTimeFormat('es-PE', {
  weekday: 'short',
  day: 'numeric',
  month: 'short',
  year: 'numeric',
  timeZone: 'UTC',
})
const dateFormatter = new Intl.DateTimeFormat('es-PE', {
  dateStyle: 'medium',
  timeZone: 'UTC',
})
const generatedAtFormatter = new Intl.DateTimeFormat('es-PE', {
  dateStyle: 'medium',
  timeStyle: 'short',
})
const monthFormatter = new Intl.DateTimeFormat('es-PE', {
  month: 'short',
  timeZone: 'UTC',
})

function parseDayDate(value) {
  return new Date(`${value}T00:00:00.000Z`)
}

function formatNumber(value) {
  return Number.isFinite(value) ? numberFormatter.format(value) : '—'
}

function formatDay(value) {
  const date = parseDayDate(value)
  return Number.isNaN(date.getTime())
    ? 'Fecha no disponible'
    : dayFormatter.format(date)
}

function formatDate(value) {
  if (!value) return 'Fecha no disponible'

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Fecha no disponible'
    : dateFormatter.format(date)
}

function formatGeneratedAt(value) {
  if (!value) return 'Fecha no disponible'

  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? 'Fecha no disponible'
    : generatedAtFormatter.format(date)
}

function formatContributions(count) {
  if (count === 1) return '1 contribución'
  return `${formatNumber(count)} contribuciones`
}

function buildMonthLabels(weeks) {
  const labels = []
  let previousMonth = null

  weeks.forEach((week, index) => {
    const firstDay = week.days.find(Boolean)

    if (!firstDay) return

    const date = parseDayDate(firstDay.date)
    const monthKey = `${date.getUTCFullYear()}-${date.getUTCMonth()}`

    if (monthKey !== previousMonth) {
      labels.push({
        index,
        label: monthFormatter.format(date),
      })
      previousMonth = monthKey
    }
  })

  return labels.map((label, labelIndex) => ({
    ...label,
    span:
      (labels[labelIndex + 1]?.index ?? weeks.length) - label.index,
  }))
}

export default function ContributionCalendar() {
  const [state, setState] = useState({
    status: 'loading',
    snapshot: null,
    error: null,
    isStale: false,
  })
  const [activeIndex, setActiveIndex] = useState(-1)
  const [tooltip, setTooltip] = useState(null)
  const [cellSize, setCellSize] = useState(null)
  const cellRefs = useRef([])
  const weeksRef = useRef(null)

  useEffect(() => {
    let active = true

    fetchContributionSnapshot()
      .then((snapshot) => {
        if (!active) return
        const generatedAt = snapshot.generatedAt
          ? new Date(snapshot.generatedAt).getTime()
          : NaN
        const isStale =
          Number.isFinite(generatedAt) &&
          Date.now() - generatedAt > 2 * 24 * 60 * 60 * 1000

        setActiveIndex(-1)
        setTooltip(null)
        setState({ status: 'ready', snapshot, error: null, isStale })
      })
      .catch((error) => {
        if (!active) return
        setState({ status: 'error', snapshot: null, error, isStale: false })
      })

    return () => {
      active = false
    }
  }, [])

  const snapshot = state.snapshot
  const weeks = useMemo(() => snapshot?.weeks ?? [], [snapshot])
  const cells = useMemo(
    () =>
      weeks.flatMap((week, weekIndex) =>
        week.days.map((day, dayIndex) => ({
          day,
          index: weekIndex * 7 + dayIndex,
        }))
      ),
    [weeks]
  )
  const firstDayIndex = useMemo(
    () => cells.findIndex((cell) => cell.day),
    [cells]
  )
  const monthLabels = useMemo(() => buildMonthLabels(weeks), [weeks])
  const activeTabIndex = activeIndex >= 0 ? activeIndex : firstDayIndex
  const isStale = state.isStale

  useLayoutEffect(() => {
    const container = weeksRef.current

    if (!container) return undefined

    const updateCellSize = () => {
      const cell = container.querySelector('.cc-cell')
      const width = cell?.getBoundingClientRect().width

      if (width > 0) {
        setCellSize(Math.round(width * 100) / 100)
      }
    }

    updateCellSize()

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateCellSize)
      return () => window.removeEventListener('resize', updateCellSize)
    }

    const observer = new ResizeObserver(updateCellSize)
    observer.observe(container)

    return () => observer.disconnect()
  }, [weeks.length])

  useEffect(() => {
    if (!tooltip) return undefined

    const hideTooltip = () => setTooltip(null)

    window.addEventListener('scroll', hideTooltip, true)
    window.addEventListener('resize', hideTooltip)

    return () => {
      window.removeEventListener('scroll', hideTooltip, true)
      window.removeEventListener('resize', hideTooltip)
    }
  }, [tooltip])

  function showTooltip(day, element) {
    const rect = element.getBoundingClientRect()
    const center = rect.left + rect.width / 2
    const margin = Math.min(96, window.innerWidth / 2)

    setTooltip({
      day,
      left: Math.min(Math.max(center, margin), window.innerWidth - margin),
      top: rect.top,
      placement: rect.top < 80 ? 'bottom' : 'top',
    })
  }

  function focusCell(index) {
    const cell = cellRefs.current[index]
    if (cell) cell.focus()
  }

  function moveFocus(currentIndex, deltaWeek, deltaDay) {
    let week = Math.floor(currentIndex / 7) + deltaWeek
    let day = (currentIndex % 7) + deltaDay

    while (week >= 0 && week < weeks.length && day >= 0 && day < 7) {
      const targetIndex = week * 7 + day

      if (cells[targetIndex]?.day) {
        focusCell(targetIndex)
        return
      }

      week += deltaWeek
      day += deltaDay
    }
  }

  function focusWeekEdge(currentIndex, edge) {
    const week = Math.floor(currentIndex / 7)
    const start = edge === 'start' ? 0 : 6
    const step = edge === 'start' ? 1 : -1

    for (let day = start; day >= 0 && day < 7; day += step) {
      const targetIndex = week * 7 + day

      if (cells[targetIndex]?.day) {
        focusCell(targetIndex)
        return
      }
    }
  }

  function handleKeyDown(event, currentIndex) {
    switch (event.key) {
      case 'ArrowLeft':
        event.preventDefault()
        moveFocus(currentIndex, -1, 0)
        break
      case 'ArrowRight':
        event.preventDefault()
        moveFocus(currentIndex, 1, 0)
        break
      case 'ArrowUp':
        event.preventDefault()
        moveFocus(currentIndex, 0, -1)
        break
      case 'ArrowDown':
        event.preventDefault()
        moveFocus(currentIndex, 0, 1)
        break
      case 'Home':
        event.preventDefault()
        focusWeekEdge(currentIndex, 'start')
        break
      case 'End':
        event.preventDefault()
        focusWeekEdge(currentIndex, 'end')
        break
      default:
        break
    }
  }

  function handleCellFocus(event, index, day) {
    setActiveIndex(index)
    showTooltip(day, event.currentTarget)
  }

  const hasActivity = snapshot ? snapshot.totalContributions > 0 : false
  const tooltipId = 'cc-contribution-tooltip'

  return (
    <section
      className="ec-panel ec-panel--contributions cc-panel"
      aria-labelledby="cc-title"
      aria-busy={state.status === 'loading'}
    >
      <div className="ec-panel-header cc-header">
        <div className="cc-heading">
          <h3 id="cc-title" className="ec-panel-title">
            Actividad de contribuciones
          </h3>
          <p className="cc-subtitle">
            Últimas 52 semanas · datos públicos de GitHub
          </p>
        </div>

        {state.status === 'ready' && snapshot && (
          <p className={`ec-panel-note cc-updated${isStale ? ' is-stale' : ''}`}>
            {snapshot.source === 'api'
              ? 'Datos actualizados el '
              : 'Snapshot actualizado el '}
            <time dateTime={snapshot.generatedAt || undefined}>
              {formatGeneratedAt(snapshot.generatedAt)}
            </time>
            {isStale ? ' · puede estar desactualizado' : ''}
          </p>
        )}
      </div>

      {state.status === 'loading' && (
        <div className="cc-state" role="status">
          <p>Cargando actividad de contribuciones…</p>
        </div>
      )}

      {state.status === 'error' && (
        <div className="cc-state" role="status">
          <p className="cc-state-title">
            {state.error?.code === 'not-found'
              ? 'Actividad de contribuciones pendiente'
              : 'No se pudo cargar la actividad de contribuciones'}
          </p>
          <p>
            {state.error?.code === 'not-found'
              ? 'El calendario se actualiza desde GitHub. Todavía no hay datos publicados.'
              : 'El calendario no está disponible en este momento. Puedes consultar la actividad directamente en GitHub.'}
          </p>
          <a
            className="cc-profile-link"
            href={GITHUB_PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon className="cc-link-icon" />
            <span>Ver actividad en GitHub</span>
            <ExternalLinkIcon className="cc-link-external" />
          </a>
        </div>
      )}

      {state.status === 'ready' && snapshot && (
        <>
          <div className="cc-summary">
            <p className="cc-total">
              <strong>{formatNumber(snapshot.totalContributions)}</strong>{' '}
              contribuciones en el periodo
            </p>
            <p className="cc-period">
              {formatDate(snapshot.period.from)} —{' '}
              {formatDate(snapshot.period.to)}
            </p>
          </div>

          {!hasActivity && (
            <p className="cc-empty-note" role="status">
              No se registraron contribuciones en este periodo.
            </p>
          )}

          <div className="cc-body">
            <div
              className="cc-weekdays"
              aria-hidden="true"
              style={
                cellSize
                  ? { '--cc-cell-size': `${cellSize}px` }
                  : undefined
              }
            >
              <span />
              <span>Lun</span>
              <span />
              <span>Mié</span>
              <span />
              <span>Vie</span>
              <span />
            </div>

            <div className="cc-scroll" onScroll={() => setTooltip(null)}>
              <div
                className="cc-calendar"
                style={{ '--cc-week-count': weeks.length }}
              >
                <div className="cc-months" aria-hidden="true">
                  {monthLabels.map(({ index, label, span }) => (
                    <span
                      className="cc-month"
                      key={`${index}-${label}`}
                      style={{
                        gridColumn: `${index + 1} / span ${span}`,
                      }}
                    >
                      {label}
                    </span>
                  ))}
                </div>

                <div
                  className="cc-weeks"
                  ref={weeksRef}
                  role="group"
                  aria-label={`Contribuciones diarias de las últimas ${weeks.length} semanas`}
                >
                  {weeks.flatMap((week, weekIndex) =>
                    week.days.map((day, dayIndex) => {
                      const index = weekIndex * 7 + dayIndex

                      if (!day) {
                        return (
                          <span
                            className="cc-cell cc-cell--empty"
                            key={`empty-${index}`}
                            aria-hidden="true"
                          />
                        )
                      }

                      const isActive = index === activeTabIndex

                      return (
                        <button
                          className={`cc-cell cc-level-${day.level}`}
                          key={day.date}
                          ref={(element) => {
                            cellRefs.current[index] = element
                          }}
                          type="button"
                          tabIndex={isActive ? 0 : -1}
                          aria-label={`${formatDay(day.date)}: ${formatContributions(day.count)}`}
                          aria-describedby={
                            isActive && tooltip ? tooltipId : undefined
                          }
                          onFocus={(event) =>
                            handleCellFocus(event, index, day)
                          }
                          onBlur={() => setTooltip(null)}
                          onMouseEnter={(event) =>
                            showTooltip(day, event.currentTarget)
                          }
                          onMouseLeave={() => setTooltip(null)}
                          onKeyDown={(event) => handleKeyDown(event, index)}
                        />
                      )
                    })
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="cc-footer">
            <p className="cc-source">
              {snapshot.source === 'api'
                ? 'Datos públicos de GitHub con caché de 15 minutos. '
                : 'Snapshot público de GitHub. '}
              Solo se muestran fecha, número e intensidad; no se incluyen
              repositorios, mensajes ni colaboradores.
            </p>
            <div
              className="cc-legend"
              role="group"
              aria-label="Intensidad de contribuciones: menos a más"
            >
              <span>Menos</span>
              <span className="cc-legend-cells" aria-hidden="true">
                {[0, 1, 2, 3, 4].map((level) => (
                  <span
                    className={`cc-legend-cell cc-level-${level}`}
                    key={level}
                  />
                ))}
              </span>
              <span>Más</span>
            </div>
          </div>
        </>
      )}

      {tooltip &&
        typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`cc-tooltip cc-tooltip--${tooltip.placement}`}
            id={tooltipId}
            role="tooltip"
            style={{
              left: `${tooltip.left}px`,
              top: `${tooltip.top}px`,
            }}
          >
            <span className="cc-tooltip-date">
              {formatDay(tooltip.day.date)}
            </span>
            <span className="cc-tooltip-count">
              {formatContributions(tooltip.day.count)}
            </span>
          </div>,
          document.body
        )}
    </section>
  )
}
