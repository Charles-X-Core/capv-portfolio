import { useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { experiences } from "./experience.data";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import "./Experience.css";

export default function Experience() {
  const [active, setActive] = useState(0);
  const prefersReducedMotion = useReducedMotion();
  const tabRefs = useRef([]);
  const { ref, isInView } = useScrollReveal();
  const experience = experiences[active];

  function handleTimelineKeyDown(event, index) {
    const lastIndex = experiences.length - 1;
    let nextIndex = null;

    switch (event.key) {
      case "ArrowDown":
      case "ArrowRight":
        nextIndex = index === lastIndex ? 0 : index + 1;
        break;
      case "ArrowUp":
      case "ArrowLeft":
        nextIndex = index === 0 ? lastIndex : index - 1;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = lastIndex;
        break;
      default:
        return;
    }

    event.preventDefault();
    setActive(nextIndex);
    tabRefs.current[nextIndex]?.focus();
  }

  return (
    <motion.section
      id="experience"
      ref={ref}
      className="experience"
      aria-labelledby="experience-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: "easeOut",
      }}
    >
      <div className="experience-shell">
        <header className="experience-header">
          <span className="experience-eyebrow">Trayectoria</span>
          <h2 id="experience-title">Experiencia Profesional</h2>
          <p className="experience-subtitle">
            Desarrollo de producto, aplicaciones de gestión y soluciones
            full-stack para clientes.
          </p>
        </header>

        <div className="experience-grid">
          <aside
            className="experience-timeline"
            role="tablist"
            aria-label="Experiencias profesionales"
            aria-orientation="vertical"
          >
            <div className="timeline-line" aria-hidden="true" />

            {experiences.map((item, index) => {
              const isActive = index === active;

              return (
                <motion.button
                  key={item.label}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`experience-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls="experience-panel"
                  tabIndex={isActive ? 0 : -1}
                  className={`timeline-item${isActive ? " active" : ""}`}
                  onClick={() => setActive(index)}
                  onKeyDown={(event) => handleTimelineKeyDown(event, index)}
                  whileHover={
                    prefersReducedMotion ? undefined : { x: 4 }
                  }
                  whileTap={
                    prefersReducedMotion ? undefined : { scale: 0.98 }
                  }
                >
                  <span className="dot" aria-hidden="true" />
                  <span className="timeline-copy">
                    <span className="timeline-label">{item.label}</span>
                    <span className="timeline-period">{item.period}</span>
                  </span>
                </motion.button>
              );
            })}
          </aside>

          <div
            className="experience-detail-wrapper"
            id="experience-panel"
            role="tabpanel"
            aria-labelledby={`experience-tab-${active}`}
            tabIndex={0}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.article
                key={experience.label}
                className="experience-detail"
                initial={
                  prefersReducedMotion ? false : { opacity: 0, x: 24 }
                }
                animate={{ opacity: 1, x: 0 }}
                exit={
                  prefersReducedMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: -24 }
                }
                transition={{
                  duration: prefersReducedMotion ? 0 : 0.32,
                  ease: "easeOut",
                }}
              >
                <div className="experience-badges">
                  <span className="experience-type">
                    {experience.type}
                  </span>
                  <span className="experience-period">
                    {experience.period}
                  </span>
                </div>

                <h3>{experience.role}</h3>
                <p className="experience-org">
                  <strong>{experience.organization}</strong>
                  <span aria-hidden="true">·</span>
                  <span>{experience.context}</span>
                </p>

                <p className="experience-description">
                  {experience.description}
                </p>

                <h4 className="experience-section-label">Responsabilidades</h4>
                <ul className="experience-bullets">
                  {experience.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>

                <h4 className="experience-section-label">Tecnologías</h4>
                <ul
                  className="tech-list"
                  aria-label="Tecnologías utilizadas"
                >
                  {experience.tech.map((technology) => (
                    <li key={technology}>{technology}</li>
                  ))}
                </ul>

                <div className="experience-actions">
                  <motion.a
                    className="experience-link"
                    href="/cv/CV_Carlos_Picho_Vargas_2026.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={
                      prefersReducedMotion ? undefined : { x: 5 }
                    }
                    whileTap={
                      prefersReducedMotion ? undefined : { scale: 0.98 }
                    }
                  >
                    <span>Ver currículum completo</span>
                    <span aria-hidden="true">→</span>
                  </motion.a>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
