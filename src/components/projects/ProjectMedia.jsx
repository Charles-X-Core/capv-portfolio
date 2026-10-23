import { useReducedMotion } from "framer-motion";

export default function ProjectMedia({ media, title, variant = "wide" }) {
  const prefersReducedMotion = useReducedMotion();

  if (!media?.src) return null;

  const alt = media.alt || `Vista previa de ${title}`;

  // `presentation.hero` describe una imagen y no declara `type`; sin este
  // valor por defecto el bloque de imagen nunca se renderiza y la tarjeta
  // queda como una caja vacía.
  const type = media.type ?? "image";

  return (
    <div className={`project-media project-media--${variant}`}>
      {type === "image" && (
        <img src={media.src} alt={alt} loading="lazy" decoding="async" />
      )}

      {type === "video" && (
        <video
          src={media.src}
          poster={media.poster}
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
