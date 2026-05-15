import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const skills = [
  { label: 'System Design', value: 85, color: '#3b82f6' },
  { label: 'Code Quality', value: 90, color: '#8b5cf6' },
  { label: 'Performance', value: 80, color: '#06b6d4' },
  { label: 'Reliability', value: 95, color: '#10b981' },
  { label: 'Security', value: 88, color: '#f59e0b' },
  { label: 'Innovation', value: 82, color: '#ec4899' },
]

const metrics = [
  { value: 40, suffix: '%', label: 'ETL Reduction', color: '#3b82f6' },
  { value: 99.9, suffix: '%', label: 'Uptime SLA', color: '#10b981' },
  { value: 5, suffix: '+', label: 'Systems Arch', color: '#8b5cf6' },
  { value: 120, suffix: '+', label: 'Pipelines', color: '#06b6d4' },
]

function AnimatedCounter({ target, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let start = 0
    const end = target
    const incrementTime = duration / end
    const timer = setInterval(() => {
      start += 1
      setCount(start)
      if (start >= end) clearInterval(timer)
    }, incrementTime)
    return () => clearInterval(timer)
  }, [target, duration])

  return (
    <span>
      {typeof target === 'number' && target % 1 !== 0 ? count.toFixed(1) : count}
      {suffix}
    </span>
  )
}

function HexagonCard({ children, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.5, type: 'spring' }}
      viewport={{ once: true }}
      style={{
        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
        background: 'linear-gradient(135deg, rgba(255,255,255,0.05), rgba(255,255,255,0.02))',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
      }}
    >
      {children}
    </motion.div>
  )
}

export default function AdvancedRadar() {
  const [hovered, setHovered] = useState(null)

  return (
    <div className="advanced-radar-container">
      {/* Radar Chart */}
      <motion.div
        className="radar-wrapper"
        initial={{ opacity: 0, rotate: -180 }}
        whileInView={{ opacity: 1, rotate: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <svg viewBox="0 0 300 300" className="radar-svg">
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(59,130,246,0.4)" />
              <stop offset="100%" stopColor="rgba(139,92,246,0.2)" />
            </linearGradient>
            <filter id="radarGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background circles */}
          {[1, 2, 3, 4].map((i) => (
            <circle
              key={`circle-${i}`}
              cx="150"
              cy="150"
              r={i * 50}
              fill="none"
              stroke="rgba(59,130,246,0.1)"
              strokeWidth="1"
              strokeDasharray="4 4"
            />
          ))}

          {/* Axes */}
          {skills.map((_, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180)
            const x = 150 + 200 * Math.cos(angle)
            const y = 150 + 200 * Math.sin(angle)
            return (
              <line
                key={`axis-${i}`}
                x1="150"
                y1="150"
                x2={x}
                y2={y}
                stroke="rgba(59,130,246,0.2)"
                strokeWidth="1"
              />
            )
          })}

          {/* Data polygon */}
          <motion.polygon
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            points={skills.map((s, i) => {
              const angle = (i * 60 - 90) * (Math.PI / 180)
              const radius = (s.value / 100) * 200
              return `${150 + radius * Math.cos(angle)},${150 + radius * Math.sin(angle)}`
            }).join(' ')}
            fill="url(#radarGradient)"
            stroke="rgba(59,130,246,0.6)"
            strokeWidth="2"
            filter="url(#radarGlow)"
            style={{ transformOrigin: '150px 150px' }}
            animate={{
              rotate: 360,
            }}
            transition={{
              rotate: {
                duration: 30,
                repeat: Infinity,
                ease: 'linear',
              },
            }}
          />

          {/* Skill points */}
          {skills.map((s, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180)
            const radius = (s.value / 100) * 200
            const x = 150 + radius * Math.cos(angle)
            const y = 150 + radius * Math.sin(angle)
            return (
              <g key={`point-${i}`}>
                <motion.circle
                  cx={x}
                  cy={y}
                  r="8"
                  fill={s.color}
                  filter="url(#radarGlow)"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1 }}
                  whileHover={{ scale: 1.5 }}
                  style={{ cursor: 'pointer' }}
                />
              </g>
            )
          })}

          {/* Labels */}
          {skills.map((s, i) => {
            const angle = (i * 60 - 90) * (Math.PI / 180)
            const x = 150 + 230 * Math.cos(angle)
            const y = 150 + 230 * Math.sin(angle)
            return (
              <text
                key={`label-${i}`}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontFamily="Inter, sans-serif"
                fontWeight="500"
              >
                {s.label}
              </text>
            )
          })}
        </svg>
      </motion.div>

      {/* Hexagon Metrics */}
      <div className="hex-metrics">
        {metrics.map((m, i) => (
          <HexagonCard delay={i * 0.15} key={i}>
            <div className="hex-content" style={{ color: m.color }}>
              <span className="hex-value">
                <AnimatedCounter target={m.value} suffix={m.suffix} />
              </span>
              <span className="hex-label">{m.label}</span>
            </div>
          </HexagonCard>
        ))}
      </div>

      <style>{`
        .advanced-radar-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
          padding: 2rem 0;
        }

        .radar-wrapper {
          width: 300px;
          height: 300px;
        }

        .radar-svg {
          width: 100%;
          height: 100%;
        }

        .hex-metrics {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 1rem;
          width: 100%;
          max-width: 600px;
        }

        .hex-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 1.5rem;
          text-align: center;
          height: 100%;
        }

        .hex-value {
          font-size: 1.5rem;
          font-weight: 800;
          line-height: 1;
        }

        .hex-label {
          font-size: 0.7rem;
          opacity: 0.7;
          margin-top: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        @media (max-width: 640px) {
          .radar-wrapper {
            width: 250px;
            height: 250px;
          }
          .hex-metrics {
            grid-template-columns: repeat(2, 1fr);
          }
          .hex-value {
            font-size: 1.25rem;
          }
        }
      `}</style>
    </div>
  )
}