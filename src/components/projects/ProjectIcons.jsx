/**
 * Iconos lineales del modal de proyectos.
 * SVG inline para no añadir una dependencia de iconos al proyecto.
 * Todos heredan el color con `currentColor` y son decorativos por defecto.
 */

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": "true",
  focusable: "false",
};

export function IconDescription(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h4" />
    </svg>
  );
}

export function IconProblem(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3" />
    </svg>
  );
}

export function IconObjective(props) {
  return (
    <svg {...base} {...props}>
      <path d="M5 21V4" />
      <path d="M5 4h11l-1.5 4L16 12H5" />
    </svg>
  );
}

export function IconFeatures(props) {
  return (
    <svg {...base} {...props}>
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="m3 6 1.4 1.4L7 4.8" />
      <path d="m3 12 1.4 1.4L7 10.8" />
      <path d="m3 18 1.4 1.4L7 16.8" />
    </svg>
  );
}

export function IconStack(props) {
  return (
    <svg {...base} {...props}>
      <path d="m12 3 9 5-9 5-9-5 9-5Z" />
      <path d="m3 13 9 5 9-5" />
    </svg>
  );
}

export function IconArchitecture(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="4" width="18" height="6" rx="1.5" />
      <rect x="3" y="14" width="18" height="6" rx="1.5" />
      <path d="M7 7h.01M7 17h.01" />
    </svg>
  );
}

export function IconLinks(props) {
  return (
    <svg {...base} {...props}>
      <path d="M10 13a5 5 0 0 0 7.1 0l2.4-2.4a5 5 0 0 0-7.1-7.1L11 4.9" />
      <path d="M14 11a5 5 0 0 0-7.1 0L4.5 13.4a5 5 0 0 0 7.1 7.1L13 19.1" />
    </svg>
  );
}

export function IconGlobe(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18" />
      <path d="M12 3a15 15 0 0 1 0 18a15 15 0 0 1 0-18Z" />
    </svg>
  );
}

export function IconMonitor(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </svg>
  );
}

export function IconVolumeOff(props) {
  return (
    <svg {...base} {...props}>
      <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
      <path d="m16 9.5 5 5M21 9.5l-5 5" />
    </svg>
  );
}

export function IconVolumeOn(props) {
  return (
    <svg {...base} {...props}>
      <path d="M11 5 6.5 9H3v6h3.5L11 19z" />
      <path d="M15.5 8.5a5 5 0 0 1 0 7" />
      <path d="M18.5 6a9 9 0 0 1 0 12" />
    </svg>
  );
}

export function IconChevronLeft(props) {
  return (
    <svg {...base} {...props}>
      <path d="m14.5 6-6 6 6 6" />
    </svg>
  );
}

export function IconChevronRight(props) {
  return (
    <svg {...base} {...props}>
      <path d="m9.5 6 6 6-6 6" />
    </svg>
  );
}

export function IconClose(props) {
  return (
    <svg {...base} strokeWidth={1.9} {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

export function IconPlay(props) {
  return (
    <svg {...base} {...props}>
      <path d="M8 5.5v13l11-6.5z" />
    </svg>
  );
}

export function IconExternal(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4 11 13" />
      <path d="M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
    </svg>
  );
}

export function IconCheck(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12 2.6 2.6L16 9.2" />
    </svg>
  );
}

/* ---------- Categorías ---------- */

function IconGrid(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="3.5" width="7" height="7" rx="1.4" />
      <rect x="3.5" y="13.5" width="7" height="7" rx="1.4" />
      <rect x="13.5" y="13.5" width="7" height="7" rx="1.4" />
    </svg>
  );
}

function IconHeart(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 20s-7.5-4.4-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.6 12 20 12 20Z" />
    </svg>
  );
}

function IconCloud(props) {
  return (
    <svg {...base} {...props}>
      <path d="M7 18h10a4 4 0 0 0 .4-8A6 6 0 0 0 6 11.2 3.4 3.4 0 0 0 7 18Z" />
    </svg>
  );
}

function IconWallet(props) {
  return (
    <svg {...base} {...props}>
      <rect x="3" y="6" width="18" height="13" rx="2.4" />
      <path d="M3 10h18" />
      <path d="M16.5 14.5h.01" />
    </svg>
  );
}

function IconFile(props) {
  return (
    <svg {...base} {...props}>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5" />
    </svg>
  );
}

function IconBot(props) {
  return (
    <svg {...base} {...props}>
      <rect x="4" y="8" width="16" height="11" rx="3" />
      <path d="M12 4v4M8 13h.01M16 13h.01M9.5 16h5" />
    </svg>
  );
}

function IconBolt(props) {
  return (
    <svg {...base} {...props}>
      <path d="M13 3 5 14h6l-1 7 8-11h-6z" />
    </svg>
  );
}

function IconDesktop(props) {
  return (
    <svg {...base} {...props}>
      <rect x="2.5" y="4" width="19" height="12.5" rx="2" />
      <path d="M8.5 20.5h7M12 16.5v4" />
    </svg>
  );
}

function IconPhone(props) {
  return (
    <svg {...base} {...props}>
      <rect x="7" y="2.5" width="10" height="19" rx="2.4" />
      <path d="M11 18.5h2" />
    </svg>
  );
}

function IconMultimedia(props) {
  return (
    <svg {...base} {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5 15.5 12 10 15.5z" />
    </svg>
  );
}

function IconShield(props) {
  return (
    <svg {...base} {...props}>
      <path d="M12 3 5 6v5.5c0 4.4 3 7.6 7 9.5 4-1.9 7-5.1 7-9.5V6z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

const CATEGORY_ICONS = {
  aplicaciones: IconGrid,
  salud: IconHeart,
  cloud: IconCloud,
  fintech: IconWallet,
  documentos: IconFile,
  bots: IconBot,
  automatizacion: IconBolt,
  escritorio: IconDesktop,
  movil: IconPhone,
  multimedia: IconMultimedia,
  seguridad: IconShield,
};

export function ProjectCategoryIcon({ category, ...props }) {
  const key = category
    .toLocaleLowerCase("es")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .split("&")[0]
    .trim();

  const Icon = CATEGORY_ICONS[key] ?? IconGrid;

  return (
    <span className="project-category-icon" aria-hidden="true">
      <Icon {...props} />
    </span>
  );
}
