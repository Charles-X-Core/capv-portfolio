export const projects = [
  {
    id: "inventario",
    short: "Inventario Android",
    title: "Sistema de Inventario",
    subtitle: "Gestión de activos con Android Nativo y Cloud Backend",
    status: "Deploy activo",
    categories: ["Aplicaciones", "Cloud & DevOps"],
    stack: ["Android", "Spring Boot", "Azure", "MySQL", "Nginx"],
    longDescription:
      "Solución integral diseñada para optimizar la gestión de activos empresariales. Arquitectura desacoplada con app nativa en Java y API REST en Spring Boot, desplegada en Azure con servidor Linux y proxy Nginx.",
    media: {
      type: "video",
      src: "/mockups/inventario.mp4",
      alt: "Vista previa del Sistema de Inventario",
    },
    links: {
      demo: null,
      repo: null,
    },
  },

  {
    id: "devops",
    short: "DevOps Manager",
    title: "DevOps Manager",
    subtitle: "Plataforma de gestión y control DevOps",
    status: "En desarrollo",
    categories: ["Aplicaciones", "Cloud & DevOps"],
    stack: [
      "Azure",
      "VM",
      "VPS",
      "Electron",
      "Node.js",
      "React",
      "Linux",
      "Ubuntu",
      "Docker",
      "GitHub",
    ],
    longDescription:
      "DevOps Manager es una plataforma diseñada para centralizar la gestión de entornos, despliegues y proyectos DevOps desde una única interfaz. Construida con Electron y React para el frontend, y Node.js como backend, permite administrar servicios desplegados en servidores Linux (Ubuntu) sobre Azure, integrando Docker para la gestión de contenedores y GitHub como eje del control de versiones. El sistema está pensado para operar en entornos protegidos mediante VPN, priorizando seguridad, control y escalabilidad en infraestructuras cloud.",
    media: {
      type: "image",
      src: "/mockups/DevOpsManager.png",
      alt: "Interfaz de DevOps Manager",
    },
    links: {
      demo: null,
      repo: null,
    },
  },

  {
    id: "batimusic",
    short: "Bot de Música Discord",
    title: "BatiMusic",
    subtitle: "Bot de música 24/7 para Discord",
    status: "Activo",
    categories: ["Bots", "Automatización"],
    stack: [
      "Node.js",
      "Discord.js",
      "YouTube",
      "Spotify",
      "FFmpeg",
      "Cloud VM",
    ],
    longDescription:
      "BatiMusic es un bot de música para Discord diseñado para ofrecer reproducción inmediata y sin fricción. Basta con enviar el nombre de una canción o un enlace y el bot se encarga del resto. Pensado para funcionamiento 24/7 en la nube, con enfoque en estabilidad, baja latencia y experiencia simple para el usuario.",
    description: [
      "Reproducción por nombre o enlace (YouTube / Spotify).",
      "Funcionamiento 24/7 en servidor cloud.",
      "Comandos simples y respuesta rápida.",
      "Gestión automática de colas y desconexión inteligente.",
    ],
    media: {
      type: "image",
      src: "/mockups/batimusic-banner.png",
      alt: "Banner de BatiMusic, bot de música para Discord",
    },
    links: {
      demo: null,
      repo: null,
    },
  },
];
