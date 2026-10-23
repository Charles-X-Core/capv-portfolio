import {
  IconDescription,
  IconProblem,
  IconObjective,
  IconFeatures,
  IconStack,
  IconArchitecture,
  IconLinks,
  IconExternal,
  IconCheck,
} from "./ProjectIcons";

function Section({ icon: Icon, title, children }) {
  return (
    <section className="project-demo-section">
      <h4 className="project-demo-section-title">
        <span className="project-demo-section-icon" aria-hidden="true">
          <Icon />
        </span>
        {title}
      </h4>
      {children}
    </section>
  );
}

/**
 * Panel izquierdo de la presentación detallada: contexto completo del proyecto.
 * Solo renderiza las secciones para las que existen datos verificados.
 */
export default function ProjectDetailsPanel({ project }) {
  const details = project?.details ?? null;
  const hasLinks = Boolean(
    project?.links?.demo || project?.links?.repo || project?.links?.release,
  );

  return (
    <div className="project-demo-info">
      {project.longDescription && (
        <Section icon={IconDescription} title="Descripción">
          <p className="project-demo-text">{project.longDescription}</p>
        </Section>
      )}

      {details?.problem && (
        <Section icon={IconProblem} title="Problema">
          <p className="project-demo-text">{details.problem}</p>
        </Section>
      )}

      {details?.objective && (
        <Section icon={IconObjective} title="Objetivo">
          <p className="project-demo-text">{details.objective}</p>
        </Section>
      )}

      {details?.features?.length > 0 && (
        <Section icon={IconFeatures} title="Funcionalidades principales">
          <ul className="project-demo-list project-demo-list--check">
            {details.features.map((feature) => (
              <li key={feature}>
                <span className="project-demo-check" aria-hidden="true">
                  <IconCheck />
                </span>
                {feature}
              </li>
            ))}
          </ul>
        </Section>
      )}

      {project.stack?.length > 0 && (
        <Section icon={IconStack} title="Stack tecnológico">
          <div className="project-demo-stack">
            {project.stack.map((tech) => (
              <span key={tech} className="project-demo-chip">
                {tech}
              </span>
            ))}
          </div>
        </Section>
      )}

      {details?.architecture?.length > 0 && (
        <Section icon={IconArchitecture} title="Arquitectura y decisiones técnicas">
          <ul className="project-demo-list project-demo-list--plain">
            {details.architecture.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {hasLinks && (
        <Section icon={IconLinks} title="Enlaces">
          <div className="project-demo-links">
            {project.links.demo && (
              <a
                href={project.links.demo}
                target="_blank"
                rel="noreferrer"
                className="project-demo-link project-demo-link--primary"
              >
                Abrir sitio
                <IconExternal />
              </a>
            )}
            {project.links.repo && (
              <a
                href={project.links.repo}
                target="_blank"
                rel="noreferrer"
                className="project-demo-link"
              >
                Repositorio
                <IconExternal />
              </a>
            )}
            {project.links.release && (
              <a
                href={project.links.release}
                target="_blank"
                rel="noreferrer"
                className="project-demo-link"
              >
                {project.links.releaseLabel ?? "Release"}
                <IconExternal />
              </a>
            )}
          </div>
        </Section>
      )}
    </div>
  );
}
