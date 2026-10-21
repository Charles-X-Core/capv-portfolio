import { useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { projects } from "./projects.data";
import {
  ALL_CATEGORY,
  filterProjects,
  getCategoryOptions,
} from "./projectFilters";
import ProjectCard from "./ProjectCard";
import { useScrollReveal } from "../../hooks/useScrollReveal";

import "./Projects.css";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORY);
  const [query, setQuery] = useState("");
  const searchRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { ref, isInView } = useScrollReveal();

  const categories = useMemo(() => getCategoryOptions(projects), []);
  const visibleProjects = useMemo(
    () => filterProjects(projects, { category: activeCategory, query }),
    [activeCategory, query],
  );

  const activeCategoryLabel =
    categories.find((category) => category.id === activeCategory)?.label ??
    "Todos";
  const isFiltering =
    activeCategory !== ALL_CATEGORY || query.trim().length > 0;
  const projectWord = visibleProjects.length === 1 ? "proyecto" : "proyectos";

  function clearSearch() {
    setQuery("");
    searchRef.current?.focus();
  }

  function resetFilters() {
    setActiveCategory(ALL_CATEGORY);
    setQuery("");
    searchRef.current?.focus();
  }

  return (
    <motion.section
      id="projects"
      ref={ref}
      className="projects"
      aria-labelledby="projects-title"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.45,
        ease: "easeOut",
      }}
    >
      <div className="projects-shell">
        <header className="projects-header">
          <span className="projects-eyebrow">Catálogo</span>
          <h2 id="projects-title">Proyectos Destacados</h2>
          <p className="projects-subtitle">
            Explora soluciones full-stack, aplicaciones de gestión y
            automatizaciones construidas con tecnologías que uso en producción.
          </p>
        </header>

        <div className="projects-toolbar">
          <div
            className="projects-categories"
            role="group"
            aria-label="Filtrar proyectos por categoría"
          >
            {categories.map((category) => {
              const isActive = category.id === activeCategory;
              const countLabel = `${category.count} ${
                category.count === 1 ? "proyecto" : "proyectos"
              }`;

              return (
                <button
                  key={category.id}
                  type="button"
                  className={`projects-filter${isActive ? " active" : ""}`}
                  aria-pressed={isActive}
                  aria-controls="projects-catalog"
                  aria-label={`${category.label}: ${countLabel}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  <span>{category.label}</span>
                  <span className="projects-filter-count" aria-hidden="true">
                    {category.count}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="projects-search">
            <label className="projects-search-label" htmlFor="project-search">
              Buscar
            </label>
            <div className="projects-search-field">
              <svg
                className="projects-search-icon"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
              <input
                ref={searchRef}
                id="project-search"
                className="projects-search-input"
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Nombre, descripción o tecnología"
                autoComplete="off"
                spellCheck="false"
                enterKeyHint="search"
                aria-label="Buscar proyectos por nombre, descripción o tecnología"
              />
              {query.length > 0 && (
                <button
                  type="button"
                  className="projects-search-clear"
                  onClick={clearSearch}
                  aria-label="Limpiar búsqueda"
                >
                  <span aria-hidden="true">×</span>
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="projects-results-bar">
          <p
            className="projects-results"
            aria-live="polite"
            aria-atomic="true"
          >
            <strong>{visibleProjects.length}</strong> {projectWord}
            {activeCategory !== ALL_CATEGORY && (
              <span>
                {" "}
                en <strong>{activeCategoryLabel}</strong>
              </span>
            )}
            {query.trim().length > 0 && (
              <span>
                {" "}
                para <strong>“{query.trim()}”</strong>
              </span>
            )}
          </p>

          {isFiltering && (
            <button
              type="button"
              className="projects-reset"
              onClick={resetFilters}
            >
              Restablecer filtros
            </button>
          )}
        </div>

        <div className="projects-catalog" id="projects-catalog">
          {visibleProjects.length > 0 ? (
            visibleProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <div className="projects-empty">
              <span className="projects-empty-icon" aria-hidden="true">
                ⌕
              </span>
              <h3>No encontramos proyectos</h3>
              <p>
                {query.trim().length > 0
                  ? `No hay coincidencias para “${query.trim()}”.`
                  : "No hay proyectos en esta categoría."}{" "}
                Prueba con otra búsqueda o cambia los filtros.
              </p>
              <button
                type="button"
                className="projects-empty-action"
                onClick={resetFilters}
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </div>

        <footer className="projects-footer">
          <span>Más experimentos y repositorios en GitHub.</span>
          <a
            href="https://github.com/Charles-X-Core"
            target="_blank"
            rel="noreferrer"
          >
            Visitar perfil ↗
          </a>
        </footer>
      </div>
    </motion.section>
  );
}
