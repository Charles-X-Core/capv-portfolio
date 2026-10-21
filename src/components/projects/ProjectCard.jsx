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

export default function ProjectCard({ project }) {
  const prefersReducedMotion = useReducedMotion();
  const titleId = `project-title-${project.id}`;
  const hasMedia = Boolean(project.media?.src);
  const hasLinks = Boolean(project.links?.demo || project.links?.repo);
  const hasCategories = (project.categories?.length ?? 0) > 0;
  const hasStack = (project.stack?.length ?? 0) > 0;
  const statusTone = project.status ? getStatusTone(project.status) : null;

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
      {hasMedia && (
        <div className="project-card-media">
          <ProjectMedia media={project.media} title={project.title} />

          {project.status && (
            <span
              className={`project-status project-status--${statusTone}`}
            >
              <span className="project-status-dot" aria-hidden="true" />
              {project.status}
            </span>
          )}
        </div>
      )}

      <div className="project-card-body">
        {project.status && !hasMedia && (
          <span
            className={`project-status project-status--${statusTone} project-status--inline`}
          >
            <span className="project-status-dot" aria-hidden="true" />
            {project.status}
          </span>
        )}

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
          {project.title}
        </h3>
        <p className="project-subtitle">{project.subtitle}</p>
        <p className="project-description">{project.longDescription}</p>

        {hasStack && (
          <div className="project-card-tech">
            <span className="project-meta-label">Tecnologías</span>
            <div className="tech-tags">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className={`tech ${getTechClassName(tech)}`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {hasLinks && (
          <div className="project-actions">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="project-action project-action--primary"
              >
                Ver demo ↗
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
          </div>
        )}
      </div>
    </motion.article>
  );
}
