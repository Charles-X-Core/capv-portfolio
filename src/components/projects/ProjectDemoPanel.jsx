import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import {
  IconGlobe,
  IconMonitor,
  IconVolumeOff,
  IconVolumeOn,
  IconChevronLeft,
  IconChevronRight,
  IconPlay,
} from "./ProjectIcons";

const VARIANT_ICONS = {
  web: IconGlobe,
  erp: IconMonitor,
};

/**
 * Panel derecho: demostración visual del proyecto.
 *
 * Recibe la lista de clips ya normalizada y controla la variante activa, el
 * estado real de silencio del video y la tira de capturas.
 */
export default function ProjectDemoPanel({
  project,
  clips,
  clipIndex,
  onSelectClip,
  videoRef,
}) {
  const prefersReducedMotion = useReducedMotion();
  const stripRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const clip = clips[clipIndex] ?? null;
  const isPortrait = clip?.orientation === "portrait";
  const hasVariants = clips.length > 1;

  // El video arranca silenciado; reflejamos el estado real del elemento.
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    setIsMuted(video.muted);
  }, [clipIndex, videoRef]);

  const syncMuted = useCallback(() => {
    const video = videoRef.current;
    if (video) setIsMuted(video.muted);
  }, [videoRef]);

  function scrollStrip(direction) {
    const strip = stripRef.current;
    if (!strip) return;
    strip.scrollBy({
      left: direction * Math.max(220, strip.clientWidth * 0.7),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }

  if (!clip) {
    return (
      <div className="project-demo-visual project-demo-visual--simple">
        <div className="project-demo-novideo">
          <span className="project-demo-novideo-icon" aria-hidden="true">
            <IconPlay />
          </span>
          <p>
            Este proyecto todavía no tiene una demostración en video verificada.
          </p>
          {project.presentation?.hero?.src && (
            <img
              src={project.presentation.hero.src}
              alt={project.presentation.hero.alt ?? project.title}
              className="project-demo-fallback"
              loading="lazy"
              decoding="async"
            />
          )}
        </div>
      </div>
    );
  }

  const CaptionIcon = VARIANT_ICONS[clip.id] ?? IconMonitor;

  return (
    <div
      className={`project-demo-visual${
        hasVariants ? "" : " project-demo-visual--simple"
      }`}
    >
      {hasVariants && (
        <div
          className="project-demo-tabs"
          role="group"
          aria-label="Variantes de demostración"
        >
          {clips.map((item, index) => {
            const Icon = VARIANT_ICONS[item.id] ?? IconMonitor;
            const active = index === clipIndex;

            return (
              <button
                key={item.src}
                type="button"
                className={`project-demo-tab${active ? " active" : ""}`}
                aria-pressed={active}
                onClick={() => onSelectClip(index)}
              >
                <span className="project-demo-tab-icon" aria-hidden="true">
                  <Icon />
                </span>
                {item.label ?? item.title}
              </button>
            );
          })}
        </div>
      )}

      <div
        className={`project-demo-frame${
          isPortrait ? " project-demo-frame--portrait" : ""
        }`}
      >
        <div
          className={`project-demo-stage${
            isPortrait ? " project-demo-stage--portrait" : ""
          }`}
        >
          <video
            key={clip.src}
            ref={videoRef}
            className={`project-demo-video${
              isPortrait ? " project-demo-video--portrait" : ""
            }`}
            src={clip.src}
            poster={clip.poster}
            controls
            playsInline
            preload="metadata"
            autoPlay={!prefersReducedMotion}
            muted
            onVolumeChange={syncMuted}
            aria-label={`Video de demostración: ${clip.title}`}
          >
            Tu navegador no puede reproducir este video.
          </video>
        </div>
      </div>

      <div className="project-demo-caption">
        <div className="project-demo-caption-text">
          <h4 className="project-demo-caption-title">
            <span className="project-demo-caption-icon" aria-hidden="true">
              <CaptionIcon />
            </span>
            {clip.title}
          </h4>
          {clip.description && (
            <p className="project-demo-caption-desc">{clip.description}</p>
          )}
        </div>

        <span
          className={`project-demo-audio${isMuted ? "" : " is-on"}`}
          aria-live="polite"
        >
          <span aria-hidden="true">
            {isMuted ? <IconVolumeOff /> : <IconVolumeOn />}
          </span>
          {isMuted ? "Audio desactivado" : "Audio activado"}
        </span>
      </div>

      {hasVariants && (
        <div className="project-demo-strip-wrap">
          <button
            type="button"
            className="project-demo-strip-nav"
            onClick={() => scrollStrip(-1)}
            aria-label="Capturas anteriores"
          >
            <IconChevronLeft />
          </button>

          <div className="project-demo-strip" ref={stripRef}>
            {clips.map((item, index) => (
              <button
                key={`thumb-${item.src}`}
                type="button"
                className={`project-demo-thumb${
                  index === clipIndex ? " active" : ""
                }`}
                aria-pressed={index === clipIndex}
                aria-label={`Ver ${item.label ?? item.title}`}
                onClick={() => onSelectClip(index)}
              >
                <img
                  src={item.poster ?? item.hero?.src}
                  alt=""
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="project-demo-strip-nav"
            onClick={() => scrollStrip(1)}
            aria-label="Capturas siguientes"
          >
            <IconChevronRight />
          </button>
        </div>
      )}
    </div>
  );
}
