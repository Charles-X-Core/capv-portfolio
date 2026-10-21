import { useReducedMotion } from "framer-motion";

export default function ProjectMedia({ media, title }) {
  const prefersReducedMotion = useReducedMotion();

  if (!media?.src) return null;

  const alt = media.alt || `Vista previa de ${title}`;

  return (
    <div className="project-media">
      {media.type === "image" && (
        <img src={media.src} alt={alt} loading="lazy" decoding="async" />
      )}

      {media.type === "video" && (
        <video
          src={media.src}
          autoPlay={!prefersReducedMotion}
          muted
          loop={!prefersReducedMotion}
          controls={prefersReducedMotion}
          playsInline
          preload="metadata"
          aria-label={alt}
        />
      )}
    </div>
  );
}
