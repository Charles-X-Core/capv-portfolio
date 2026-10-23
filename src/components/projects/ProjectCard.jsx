import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectMedia from "./ProjectMedia";

function getTechClassName(tech) {
  const slug = tech
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `tech-${slug}` : "";
}

function getStatusTone(status) {
  return status.toLocaleLowerCase("es").includes("desarrollo")
    ? "development"
    : "active";
}

function getMonogram(title) {
  return title
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function ProjectCard({ project, onOpenDemo }) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const titleId = `project-title-${project.id}`;
  const detailsId = `project-details-${project.id}`;
  const hasMedia = Boolean(project.media?.src);
  const hasDemo = Boolean(project.demoVideo);
  const isPhoneLayout = project.presentation?.layout === "phone";
  const hasDetails = Boolean(project.longDescription);
  const hasCategories = (project.categories?.length ?? 0) > 0;
  const hasStack = (project.stack?.length ?? 0) > 0;
  const hasLinks = Boolean(
    project.links?.demo ||
      project.links?.repo ||
      project.links?.release ||
      hasDemo,
  );
  const statusTone = project.status ? getStatusTone(project.status) : null;
  const summary = project.shortDescription ?? project.longDescription;

  return (
    <motion.article
      className="project-card"
      aria-labelledby={titleId}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: "easeOut",
      }}
    >
      <div className="project-card-media-wrap">
        <button
          type="button"
          className={`project-card-media${
            hasMedia ? "" : " project-card-media--placeholder"
          }${isPhoneLayout ? " project-card-media--phone" : ""}`}
          onClick={() => onOpenDemo(project)}
          aria-label={`Abrir presentación detallada de ${project.title}`}
        >
          {hasMedia ? (
            <ProjectMedia
              media={project.presentation?.hero ?? project.media}
              title={project.title}
              variant={isPhoneLayout ? "phone" : "wide"}
            />
          ) : (
            <span className="project-media-monogram" aria-hidden="true">
              {getMonogram(project.title)}
            </span>
          )}
        </button>

        {project.status && (
          <div className="project-card-statusbar">
            <span className={`project-status project-status--inline project-status--${statusTone}`}>
              <span className="project-status-dot" aria-hidden="true" />
              {project.status}
            </span>
          </div>
        )}
      </div>

      <div className="project-card-body">
        {hasCategories && (
          <ul className="project-card-categories" aria-label="Categorías">
            {project.categories.map((category) => (
              <li key={category} className="project-category-tag">
                {category}
              </li>
            ))}
          </ul>
        )}

        <h3 className="project-title" id={titleId}>
          <button
            type="button"
            className="project-title-button"
            onClick={() => onOpenDemo(project)}
          >
            {project.title}
          </button>
        </h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{summary}</p>

        {hasDetails && (
          <>
            <button
              type="button"
              className="project-details-toggle"
              aria-expanded={detailsOpen}
              aria-controls={detailsId}
              onClick={() => setDetailsOpen((open) => !open)}
            >
              {detailsOpen ? "Ocultar detalle" : "Ver detalle"}
            </button>
            <div id={detailsId} className="project-details" hidden={!detailsOpen}>
              <p>{project.longDescription}</p>
            </div>
          </>
        )}

        {hasStack && (
          <div className="project-card-tech">
            <span className="project-meta-label">Tecnologías</span>
            <div className="tech-tags">
              {project.stack.map((tech) => (
                <span key={tech} className={`tech ${getTechClassName(tech)}`}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasLinks && (
          <div className="project-actions">
            {hasDemo && (
              <button
                type="button"
                className="project-action project-action--primary project-action--demo"
                onClick={() => onOpenDemo(project)}
                aria-label={`Ver demo en video de ${project.title}`}
              >
                <span className="project-action-play" aria-hidden="true">
                  ▶
                </span>
                Ver demo
              </button>
            )}
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="project-action project-action--primary"
              >
                Abrir sitio ↗
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="project-action"
              >
                Repositorio ↗
              </a>
            )}
            {project.links.release && (
              <a
                href={project.links.release}
                target="_blank"
                rel="noreferrer"
                className="project-action"
              >
                {project.links.releaseLabel ?? "Release"} ↗
              </a>
            )}
          </div>
        )}
      </div>
    </motion.article>
  );
}
