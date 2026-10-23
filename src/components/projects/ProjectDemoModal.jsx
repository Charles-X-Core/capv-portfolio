import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { motion, useReducedMotion } from "framer-motion";
import ProjectDetailsPanel from "./ProjectDetailsPanel";
import ProjectDemoPanel from "./ProjectDemoPanel";
import { IconClose, ProjectCategoryIcon } from "./ProjectIcons";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), video[controls], [tabindex]:not([tabindex="-1"])';

function getStatusTone(status) {
  return status.toLocaleLowerCase("es").includes("desarrollo")
    ? "development"
    : "active";
}

export default function ProjectDemoModal({ project, projectNumber, onClose }) {
  const dialogRef = useRef(null);
  const videoRef = useRef(null);
  const restoreFocusRef = useRef(null);
  const [clipIndex, setClipIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const variants = project?.presentation?.variants ?? null;

  // `presentation.demo` es la fuente verificada de orientación y aspecto.
  // Se fusiona con el clip del proyecto cuando apuntan al mismo archivo.
  function withPresentation(clip) {
    if (!clip) return null;
    const preset = project?.presentation?.demo;
    if (preset && preset.src === clip.src) return { ...preset, ...clip };
    return clip;
  }

  const clips = variants
    ? variants.map((variant) => ({
        ...variant.demo,
        id: variant.id,
        label: variant.label,
        description: variant.description,
        hero: variant.hero,
      }))
    : [project?.demoVideo, ...(project?.demosExtra ?? [])]
        .map(withPresentation)
        .filter(Boolean);

  const statusTone = project?.status ? getStatusTone(project.status) : null;

  const handleClose = useCallback(() => {
    videoRef.current?.pause();
    onClose();
  }, [onClose]);

  useEffect(() => {
    if (!project) return undefined;

    restoreFocusRef.current = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const timer = window.setTimeout(() => dialogRef.current?.focus(), 0);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      const target = restoreFocusRef.current;
      if (target && typeof target.focus === "function") target.focus();
    };
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        handleClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [project, handleClose]);

  function handleDialogKeyDown(event) {
    if (event.key !== "Tab") return;

    const focusables = dialogRef.current?.querySelectorAll(FOCUSABLE_SELECTOR);
    if (!focusables || focusables.length === 0) return;

    const list = Array.from(focusables);
    const first = list[0];
    const last = list[list.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function selectClip(index) {
    videoRef.current?.pause();
    setClipIndex(index);
  }

  if (!project || typeof document === "undefined") return null;

  const projectIndex = projectNumber ?? project.featuredRank ?? 0;
  const projectLabel = String(projectIndex).padStart(2, "0");

  return createPortal(
    <motion.div
      className="project-demo-backdrop"
      role="presentation"
      onClick={(event) => {
        if (event.target === event.currentTarget) handleClose();
      }}
      initial={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: prefersReducedMotion ? 0 : 0.2 }}
    >
      <motion.div
        className="project-demo-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-demo-title"
        ref={dialogRef}
        tabIndex={-1}
        onKeyDown={handleDialogKeyDown}
        initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        exit={prefersReducedMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
        transition={{ duration: prefersReducedMotion ? 0 : 0.25 }}
      >
        <header
          className={`project-demo-header${
            project.status ? " has-status" : ""
          }`}
        >
          <div className="project-demo-heading">
            <span className="project-demo-eyebrow">
              CHARLES-X / PROJECT {projectLabel}
            </span>
            <h3 className="project-demo-title" id="project-demo-title">
              {project.title}
            </h3>
            {project.subtitle && (
              <p className="project-demo-subtitle">{project.subtitle}</p>
            )}
            <div className="project-demo-badges">
              {(project.categories ?? []).map((category) => (
                <span key={category} className="project-category-tag">
                  <ProjectCategoryIcon category={category} />
                  {category}
                </span>
              ))}
            </div>
          </div>

          <div className="project-demo-header-side">
            {project.status && (
              <span
                className={`project-status project-status--inline project-status--${statusTone}`}
              >
                <span className="project-status-dot" aria-hidden="true" />
                {project.status}
              </span>
            )}
            <button
              type="button"
              className="project-demo-close"
              onClick={handleClose}
              aria-label="Cerrar presentación del proyecto"
            >
              <IconClose />
            </button>
          </div>
        </header>

        <div className="project-demo-layout">
          <ProjectDetailsPanel project={project} />
          <ProjectDemoPanel
            project={project}
            clips={clips}
            clipIndex={clipIndex}
            onSelectClip={selectClip}
            videoRef={videoRef}
          />
        </div>
      </motion.div>
    </motion.div>,
    document.body,
  );
}
