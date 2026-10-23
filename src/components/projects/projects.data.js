export const projects = [
  {
    id: "clinica-dental-pro",
    short: "Clínica Dental Pro",
    title: "Clínica Dental Pro",
    subtitle: "Historia clínica odontológica para escritorio (ex Vita Mirabilis)",
    shortDescription:
      "Gestión offline de pacientes, odontogramas, tratamientos, pagos, recetas y firma digital en una sola aplicación de escritorio.",
    longDescription:
      "Aplicación de escritorio para Windows dirigida a clínicas odontológicas pequeñas y medianas, diseñada y verificada junto a un doctor odontólogo. Gestiona pacientes, historias clínicas, odontograma SVG interactivo de 52 piezas con norma FDI (ISO 3950), tratamientos, pagos, recetas y evidencia clínica; genera PDFs de historia clínica, recetas, tratamientos y pagos; incorpora firma digital en tres modos, envío de mensajes y PDFs por WhatsApp, dashboard con gráficos y copias de seguridad en SQLite más exportación a Excel/CSV. Funciona completamente offline y se distribuye como instalador o versión portable. El proyecto se desarrolló originalmente con el nombre «Vita Mirabilis» y se renombró a «Clínica Dental Pro» por conflicto de marca con un tercero.",
    categories: ["Escritorio", "Salud"],
    stack: [
      "Electron",
      "Node.js",
      "React",
      "SQLite",
      "JavaScript",
      "PDF",
      "WhatsApp",
    ],
    status: "Publicado · v1.2.1",
    featuredRank: 10,
    details: {
      problem:
        "Las clínicas odontológicas pequeñas y medianas necesitan historia clínica completa sin depender de una conexión a internet.",
      objective:
        "Concentrar pacientes, odontogramas, tratamientos, pagos y recetas en una sola aplicación de escritorio que funcione offline.",
      features: [
        "Pacientes e historias clínicas con evidencia clínica.",
        "Odontograma SVG interactivo de 52 piezas con norma FDI (ISO 3950).",
        "Tratamientos, pagos y recetas.",
        "Generación de PDFs de historia clínica, recetas, tratamientos y pagos.",
        "Firma digital en tres modos.",
        "Envío de mensajes y PDFs por WhatsApp.",
        "Dashboard con gráficos.",
        "Copias de seguridad en SQLite y exportación a Excel/CSV.",
        "Distribución como instalador o versión portable.",
      ],
      architecture: [
        "Electron con Node.js y React para la interfaz de escritorio.",
        "SQLite como base de datos local, sin servidor remoto.",
        "Funcionamiento completamente offline.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/thumbs/clinica-dental-pro.jpg",
      alt: "Pantalla de acceso de Clínica Dental Pro con el logotipo de la aplicación",
    },
    links: {
      repo: "https://github.com/Charles-X-Core/odontologia-sistema",
      demo: null,
      release: "https://github.com/Charles-X-Core/odontologia-sistema/releases",
      releaseLabel: "Instalador",
    },
    demoVideo: {
      src: "/demos/clinica-dental-pro.mp4",
      poster: "/demos/thumbs/clinica-dental-pro.jpg",
      title: "Clínica Dental Pro en funcionamiento",
      duration: "1:45",
    },
    presentation: {
      layout: "wide",
      hero: {
        src: "/demos/thumbs/clinica-dental-pro.jpg",
        alt: "Pantalla de acceso de Clínica Dental Pro con el logotipo de la aplicación",
      },
      demo: {
        src: "/demos/clinica-dental-pro.mp4",
        poster: "/demos/thumbs/clinica-dental-pro.jpg",
        title: "Clínica Dental Pro en funcionamiento",
        duration: "1:45",
        orientation: "landscape",
        aspect: 16 / 9,
        hasDeviceFrame: false,
      },
    },
  },

  {
    id: "optimal-health-now",
    short: "Optimal Health Now",
    title: "Optimal Health Now",
    subtitle: "Landing page corporativa y ERP médico multi-módulo",
    shortDescription:
      "Sitio de servicios médicos y ERP clínico con agenda, citas, pacientes y documentos.",
    longDescription:
      "Trabajo completo para un cliente de Estados Unidos: landing page corporativa de servicios médicos, con navegación, testimonios y contacto, y un ERP médico con módulos de pacientes, citas, agenda médica, consultas, tratamientos y documentos clínicos. Backend REST en Java 21 y Spring Boot 3 con Spring Security y control de acceso por roles DOCTORA y ENFERMERA; frontend en React con PWA para tablets y captura de firmas digitales; MySQL 8 desplegado en un VPS con Ubuntu. El código del ERP está publicado de forma abierta en el repositorio medical-erp.",
    categories: ["Aplicaciones", "Salud", "Cloud & DevOps"],
    stack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "React",
      "MySQL",
      "REST API",
      "PWA",
      "Ubuntu Server",
      "VPS",
    ],
    status: "Entregado · 2026",
    featuredRank: 20,
    details: {
      problem:
        "Un cliente de Estados Unidos necesitaba presencia web corporativa y un sistema de gestión clínica para su consulta.",
      objective:
        "Entregar la landing page de servicios médicos y el ERP clínico que la respalda, con control de acceso por roles.",
      features: [
        "Landing page corporativa con navegación, testimonios y contacto.",
        "Módulos de pacientes, citas, agenda médica, consultas, tratamientos y documentos clínicos.",
        "Control de acceso por roles DOCTORA y ENFERMERA.",
        "Frontend en React con PWA para tablets.",
        "Captura de firmas digitales.",
      ],
      architecture: [
        "Backend REST en Java 21 y Spring Boot 3 con Spring Security.",
        "Frontend en React con PWA para tablets.",
        "MySQL 8 desplegado en un VPS con Ubuntu.",
        "El código del ERP está publicado como medical-erp.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/thumbs/optimal-erp.jpg",
      alt: "Panel de la doctora con agenda y tratamiento de citas en el ERP médico",
    },
    links: {
      repo: "https://github.com/Charles-X-Core/medical-erp",
      demo: null,
      release: null,
    },
    demoVideo: {
      src: "/demos/optimal-erp.mp4",
      poster: "/demos/thumbs/optimal-erp.jpg",
      title: "ERP médico en funcionamiento",
      duration: "2:12",
    },
    demosExtra: [
      {
        src: "/demos/optimal-landing.mp4",
        poster: "/demos/thumbs/optimal-web.jpg",
        title: "Landing page corporativa",
        duration: "1:44",
      },
    ],
    presentation: {
      layout: "wide",
      hero: {
        src: "/demos/thumbs/optimal-erp.jpg",
        alt: "Panel de la doctora con agenda y tratamiento de citas en el ERP médico",
      },
      variants: [
        {
          id: "web",
          label: "Página web",
          description:
            "Landing page corporativa de servicios médicos: navegación, presentación de especialidades, testimonios y formulario de contacto.",
          hero: {
            src: "/demos/thumbs/optimal-web.jpg",
            alt: "Landing page corporativa de Optimal Health Now con la doctora y el sitio en un portátil",
          },
          demo: {
            src: "/demos/optimal-landing.mp4",
            poster: "/demos/thumbs/optimal-web.jpg",
            title: "Landing page corporativa",
            duration: "1:44",
            orientation: "landscape",
            aspect: 16 / 9,
            hasDeviceFrame: false,
          },
        },
        {
          id: "erp",
          label: "ERP médico",
          description:
            "Sistema de gestión médica con módulos de pacientes, citas, agenda médica, consultas, tratamientos y documentos clínicos, con acceso por roles DOCTORA y ENFERMERA.",
          hero: {
            src: "/demos/thumbs/optimal-erp.jpg",
            alt: "Panel de la doctora con agenda y tratamiento de citas en el ERP médico",
          },
          demo: {
            src: "/demos/optimal-erp.mp4",
            poster: "/demos/thumbs/optimal-erp.jpg",
            title: "ERP médico en funcionamiento",
            duration: "2:12",
            orientation: "landscape",
            aspect: 16 / 9,
            hasDeviceFrame: false,
          },
        },
      ],
    },
  },

  {
    id: "track-pays",
    short: "Track Pays",
    title: "Track Pays",
    subtitle: "Gestión de finanzas personales",
    shortDescription:
      "Ingresos, gastos, movimientos y dashboard con la regla 50/30/20 en tiempo real.",
    longDescription:
      "Aplicación web de gestión financiera personal: 8 categorías y 25 tipos de ingreso con motor de recurrencia (semanal, quincenal, mensual, trimestral, anual) y detección automática de patrones; gastos primarios y no esenciales con 52 subcategorías y seguimiento de suscripciones; balance acumulado, comparativa de ingresos y gastos, regla 50/30/20 con barras de progreso, sparklines de tendencia y alertas de pagos próximos o atrasados; historial de transacciones con búsqueda, edición y eliminación; y panel de configuración con perfil de usuario. Construida con Angular 21, TypeScript y Firebase, desplegada en Vercel.",
    categories: ["Aplicaciones", "Fintech"],
    stack: ["Angular", "TypeScript", "Firebase", "Vercel"],
    status: "Publicado",
    featuredRank: 30,
    details: {
      problem:
        "Llevar el control de las finanzas personales sin hojas de cálculo ni registro manual de cada movimiento.",
      objective:
        "Ofrecer un panel que muestre ingresos, gastos y balance con la regla 50/30/20 aplicada en tiempo real.",
      features: [
        "8 categorías y 25 tipos de ingreso con motor de recurrencia (semanal, quincenal, mensual, trimestral, anual).",
        "Detección automática de patrones de ingreso.",
        "Gastos primarios y no esenciales con 52 subcategorías y seguimiento de suscripciones.",
        "Balance acumulado y comparativa de ingresos y gastos.",
        "Regla 50/30/20 con barras de progreso y sparklines de tendencia.",
        "Alertas de pagos próximos o atrasados.",
        "Historial de transacciones con búsqueda, edición y eliminación.",
        "Panel de configuración con perfil de usuario.",
      ],
      architecture: [
        "Angular 21 con TypeScript.",
        "Firebase como backend.",
        "Desplegada en Vercel.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/thumbs/track-pays.jpg",
      alt: "Pantalla de acceso de Track Pays con la marca de la aplicación",
    },
    links: {
      repo: "https://github.com/Charles-X-Core/Track-Pays",
      demo: "https://track-pays.vercel.app",
      release: null,
    },
    demoVideo: {
      src: "/demos/track-pays.mp4",
      poster: "/demos/thumbs/track-pays.jpg",
      title: "Recorrido por Track Pays",
      duration: "1:38",
    },
    presentation: {
      layout: "wide",
      hero: {
        src: "/demos/thumbs/track-pays.jpg",
        alt: "Pantalla de acceso de Track Pays con la marca de la aplicación",
      },
      demo: {
        src: "/demos/track-pays.mp4",
        poster: "/demos/thumbs/track-pays.jpg",
        title: "Recorrido por Track Pays",
        duration: "1:38",
        orientation: "landscape",
        aspect: 16 / 9,
        hasDeviceFrame: false,
      },
    },
  },

  {
    id: "fakelove-pdf-tools",
    short: "FakeLove PDF Tools",
    title: "FakeLove PDF Tools",
    subtitle: "Suite de herramientas PDF en Next.js",
    shortDescription:
      "Unir, dividir, comprimir y convertir PDF con interfaz bilingüe y procesamiento en segundo plano.",
    longDescription:
      "Parodia de suite PDF con personalidad: unir, dividir y comprimir documentos, convertir imágenes a PDF y exportar a Word, Excel o PowerPoint. Procesa todas las páginas en segundo plano sin bloquear la interfaz, guarda el historial de procesos entre recargas, incluye un selector de idioma español/inglés con persistencia en localStorage y una capa de detalles y animaciones (firma del desarrollador, fuegos binarios, monitor ECG). Construida con Next.js 14, TypeScript y SCSS, y desplegada en Vercel.",
    categories: ["Aplicaciones", "Documentos"],
    stack: ["Next.js", "TypeScript", "React", "SCSS", "Vercel"],
    status: "Publicado",
    featuredRank: 40,
    details: {
      problem:
        "Las tareas habituales con PDF obligan a saltar entre herramientas distintas para unir, dividir, comprimir o convertir.",
      objective:
        "Reunir las operaciones PDF más comunes en una sola interfaz, sin bloquear al usuario mientras procesa.",
      features: [
        "Unir, dividir y comprimir documentos.",
        "Convertir imágenes a PDF y exportar a Word, Excel o PowerPoint.",
        "Procesamiento de todas las páginas en segundo plano sin bloquear la interfaz.",
        "Historial de procesos que se conserva entre recargas.",
        "Selector de idioma español/inglés con persistencia en localStorage.",
      ],
      architecture: [
        "Next.js 14 con TypeScript y SCSS.",
        "Desplegada en Vercel.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/thumbs/fakelove-pdf-tools.jpg",
      alt: "Interfaz de FakeLove PDF Tools con las herramientas de unir, comprimir y convertir",
    },
    links: {
      repo: "https://github.com/Charles-X-Core/FakeLove-PDF-Tools",
      demo: "https://fake-love-pdf-tools.vercel.app",
      release: null,
    },
    demoVideo: {
      src: "/demos/fakelove-pdf-tools.mp4",
      poster: "/demos/thumbs/fakelove-pdf-tools.jpg",
      title: "FakeLove PDF Tools en funcionamiento",
      duration: "1:53",
    },
    presentation: {
      layout: "wide",
      hero: {
        src: "/demos/thumbs/fakelove-pdf-tools.jpg",
        alt: "Interfaz de FakeLove PDF Tools con las herramientas de unir, comprimir y convertir",
      },
      demo: {
        src: "/demos/fakelove-pdf-tools.mp4",
        poster: "/demos/thumbs/fakelove-pdf-tools.jpg",
        title: "FakeLove PDF Tools en funcionamiento",
        duration: "1:53",
        orientation: "landscape",
        aspect: 16 / 9,
        hasDeviceFrame: false,
      },
    },
  },

  {
    id: "tube-to-album",
    short: "TubeToAlbum",
    title: "TubeToAlbum",
    subtitle: "Descargador de YouTube a MP3/MP4 para escritorio",
    shortDescription:
      "Descarga de YouTube con metadatos, portadas embebidas e instalación por instalador.",
    longDescription:
      "Descargador profesional de YouTube a MP3/MP4 para PC: interfaz Electron sobre un backend Python con FFmpeg para el procesamiento, metadatos completos, portadas embebidas (APIC y folder.jpg) y organización automática en carpetas. Incluye una CLI para uso sin interfaz y un instalador NSIS que empaqueta Python, FFmpeg y las dependencias de Electron. El repositorio publica el instalador de la versión 1.0.0.",
    categories: ["Escritorio", "Multimedia"],
    stack: ["Python", "Electron", "Node.js", "FFmpeg", "JavaScript"],
    status: "Publicado · v1.0.0",
    featuredRank: 50,
    details: {
      problem:
        "Descargar audio o video de YouTube con metadatos y portadas correctas suele requerir varios programas encadenados a mano.",
      objective:
        "Automatizar la descarga y la organización en carpetas desde una sola aplicación de escritorio.",
      features: [
        "Descarga de YouTube a MP3 y MP4.",
        "Metadatos completos y portadas embebidas (APIC y folder.jpg).",
        "Organización automática en carpetas.",
        "CLI para uso sin interfaz.",
        "Instalador NSIS que empaqueta Python, FFmpeg y las dependencias de Electron.",
      ],
      architecture: [
        "Interfaz Electron sobre un backend Python.",
        "FFmpeg para el procesamiento de audio y video.",
        "Instalador NSIS para la distribución en Windows.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/thumbs/tubetoalbum.jpg",
      alt: "Interfaz de TubeToAlbum con la descarga de audio en curso",
    },
    links: {
      repo: "https://github.com/Charles-X-Core/TubeToAlbum",
      demo: null,
      release:
        "https://github.com/Charles-X-Core/TubeToAlbum/releases/tag/v1.0.0",
      releaseLabel: "Instalador",
    },
    demoVideo: {
      src: "/demos/tubetoalbum.mp4",
      poster: "/demos/thumbs/tubetoalbum.jpg",
      title: "TubeToAlbum en funcionamiento",
      duration: "0:28",
    },
    presentation: {
      layout: "wide",
      hero: {
        src: "/demos/thumbs/tubetoalbum.jpg",
        alt: "Interfaz de TubeToAlbum con la descarga de audio en curso",
      },
      demo: {
        src: "/demos/tubetoalbum.mp4",
        poster: "/demos/thumbs/tubetoalbum.jpg",
        title: "TubeToAlbum en funcionamiento",
        duration: "0:28",
        orientation: "landscape",
        aspect: 16 / 9,
        hasDeviceFrame: false,
      },
    },
  },

  {
    id: "inventario",
    short: "Inventario Android",
    title: "Sistema de Inventario",
    subtitle: "Gestión de activos con Android Nativo y Cloud Backend",
    shortDescription:
      "App nativa en Java con API REST en Spring Boot para optimizar la gestión de activos empresariales.",
    longDescription:
      "Solución integral diseñada para optimizar la gestión de activos empresariales. Arquitectura desacoplada con app nativa en Java y API REST en Spring Boot, desplegada en Azure con servidor Linux y proxy Nginx.",
    categories: ["Móvil", "Cloud & DevOps"],
    stack: ["Android", "Spring Boot", "Azure", "MySQL", "Nginx"],
    status: "Deploy activo",
    featuredRank: 60,
    details: {
      problem:
        "La gestión de activos empresariales necesitaba una app móvil con un backend centralizado.",
      objective:
        "Optimizar el control de activos con una arquitectura desacoplada entre la app y la API.",
      features: [
        "App nativa en Java para el registro y consulta de activos.",
        "API REST en Spring Boot como backend.",
      ],
      architecture: [
        "Arquitectura desacoplada: app nativa en Java y API REST en Spring Boot.",
        "Desplegada en Azure con servidor Linux y proxy Nginx.",
        "MySQL como base de datos.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/posters/sistema-inventario.jpg",
      alt: "Vista previa de la aplicación de inventario en Android",
    },
    links: {
      repo: null,
      demo: null,
      release: null,
    },
    demoVideo: {
      src: "/mockups/inventario.mp4",
      poster: "/demos/posters/sistema-inventario.jpg",
      title: "App de inventario en funcionamiento",
      duration: "1:00",
    },
    presentation: {
      layout: "wide",
      hero: {
        src: "/demos/posters/sistema-inventario.jpg",
        alt: "Vista previa de la aplicación de inventario en Android",
      },
      demo: {
        src: "/mockups/inventario.mp4",
        poster: "/demos/posters/sistema-inventario.jpg",
        title: "App de inventario en funcionamiento",
        duration: "1:00",
        orientation: "landscape",
        aspect: 740 / 404,
        hasDeviceFrame: false,
      },
    },
  },

  {
    id: "devops",
    short: "DevOps Manager",
    title: "DevOps Manager",
    subtitle: "Plataforma de gestión y control DevOps",
    shortDescription:
      "Centraliza entornos, despliegues y proyectos DevOps desde una interfaz de escritorio.",
    longDescription:
      "DevOps Manager es una plataforma diseñada para centralizar la gestión de entornos, despliegues y proyectos DevOps desde una única interfaz. Construida con Electron y React para el frontend, y Node.js como backend, permite administrar servicios desplegados en servidores Linux (Ubuntu) sobre Azure, integrando Docker para la gestión de contenedores y GitHub como eje del control de versiones. El sistema está pensado para operar en entornos protegidos mediante VPN, priorizando seguridad, control y escalabilidad en infraestructuras cloud.",
    categories: ["Escritorio", "Cloud & DevOps"],
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
    status: "En desarrollo",
    featuredRank: 70,
    details: {
      problem:
        "Administrar entornos, despliegues y proyectos DevOps repartidos entre servidores exige cambiar constantemente de herramienta.",
      objective:
        "Centralizar esa gestión en una única interfaz de escritorio, operando en entornos protegidos mediante VPN.",
      features: [
        "Gestión de entornos, despliegues y proyectos DevOps desde una sola interfaz.",
        "Administración de servicios desplegados en servidores Linux (Ubuntu) sobre Azure.",
        "Gestión de contenedores con Docker.",
        "GitHub como eje del control de versiones.",
      ],
      architecture: [
        "Electron y React para el frontend, Node.js como backend.",
        "Pensado para operar en entornos protegidos mediante VPN.",
      ],
    },
    media: {
      type: "image",
      src: "/mockups/DevOpsManager.png",
      alt: "Interfaz de DevOps Manager",
    },
    links: {
      repo: null,
      demo: null,
      release: null,
    },
    demoVideo: null,
    presentation: {
      layout: "wide",
      hero: {
        src: "/mockups/DevOpsManager.png",
        alt: "Interfaz de DevOps Manager",
      },
      demo: null,
    },
  },

  {
    id: "batimusic",
    short: "Bot de Música Discord",
    title: "BatiMusic",
    subtitle: "Bot de música 24/7 para Discord",
    shortDescription:
      "Reproducción inmediata por nombre o enlace, con gestión automática de colas.",
    longDescription:
      "BatiMusic es un bot de música para Discord diseñado para ofrecer reproducción inmediata y sin fricción. Basta con enviar el nombre de una canción o un enlace y el bot se encarga del resto. Pensado para funcionamiento 24/7 en la nube, con enfoque en estabilidad, baja latencia y experiencia simple para el usuario.",
    description: [
      "Reproducción por nombre o enlace (YouTube / Spotify).",
      "Funcionamiento 24/7 en servidor cloud.",
      "Comandos simples y respuesta rápida.",
      "Gestión automática de colas y desconexión inteligente.",
    ],
    categories: ["Bots", "Automatización"],
    stack: [
      "Node.js",
      "Discord.js",
      "YouTube",
      "Spotify",
      "FFmpeg",
      "Cloud VM",
    ],
    status: "Activo",
    featuredRank: 80,
    details: {
      features: [
        "Reproducción por nombre o enlace (YouTube / Spotify).",
        "Funcionamiento 24/7 en servidor cloud.",
        "Comandos simples y respuesta rápida.",
        "Gestión automática de colas y desconexión inteligente.",
      ],
      architecture: [
        "Node.js con Discord.js.",
        "FFmpeg para el procesamiento de audio.",
        "Desplegado en una VM en la nube para funcionamiento continuo.",
      ],
    },
    media: {
      type: "image",
      src: "/mockups/batimusic-banner.png",
      alt: "Banner de BatiMusic, bot de música para Discord",
    },
    links: {
      repo: null,
      demo: null,
      release: null,
    },
    demoVideo: null,
  },

  {
    id: "albumica",
    short: "Albumica",
    title: "Albumica",
    subtitle: "App Android de reproducción musical",
    shortDescription:
      "Aplicación Android de música construida en Kotlin con Jetpack Compose y AndroidX Media3.",
    longDescription:
      "App Android nativa orientada a la reproducción musical, con interfaz en Jetpack Compose, capa de reproducción sobre AndroidX Media3 e integración con la API InnerTube de YouTube para el catálogo de novedades. Los registros de dispositivo disponibles corresponden a la variante de depuración com.albumica.app.debug compilada contra target SDK 35.",
    categories: ["Móvil", "Multimedia"],
    stack: ["Android", "Kotlin", "Jetpack Compose", "AndroidX Media3"],
    featuredRank: 90,
    details: {
      features: [
        "Reproducción musical con interfaz en Jetpack Compose.",
        "Capa de reproducción sobre AndroidX Media3.",
        "Catálogo de novedades mediante la API InnerTube de YouTube.",
      ],
      architecture: [
        "App Android nativa en Kotlin.",
        "Jetpack Compose para la interfaz y AndroidX Media3 para la reproducción.",
        "Los registros de dispositivo disponibles corresponden a la variante de depuración com.albumica.app.debug, compilada contra target SDK 35.",
      ],
    },
    media: {
      type: "image",
      src: "/demos/thumbs/albumica.jpg",
      alt: "Logotipo de Albumica junto a la interfaz de la app en un teléfono",
    },
    links: {
      repo: null,
      demo: null,
      release: null,
    },
    demoVideo: {
      src: "/demos/albumica.mp4",
      poster: "/demos/thumbs/albumica.jpg",
      title: "Albumica en funcionamiento",
      duration: "3:56",
    },
    presentation: {
      layout: "phone",
      hero: {
        src: "/demos/thumbs/albumica.jpg",
        alt: "Logotipo de Albumica junto a la interfaz de la app en un teléfono",
      },
      demo: {
        src: "/demos/albumica.mp4",
        poster: "/demos/thumbs/albumica.jpg",
        title: "Albumica en funcionamiento",
        duration: "3:56",
        orientation: "portrait",
        aspect: 418 / 900,
        hasDeviceFrame: true,
      },
    },
  },

  {
    id: "mecanica-robocop",
    short: "Mecánica Robocop",
    title: "Mecánica Robocop",
    subtitle: "Sistema de inventario para taller mecánico",
    shortDescription:
      "Aplicación de escritorio con base de datos local, copias de seguridad e integración con la red del taller.",
    longDescription:
      "Implementación y mantenimiento de un sistema de inventario para el negocio del cliente: aplicación de escritorio con base de datos local SQLite, copias de seguridad y resolución de incidencias, instalación de la red que conecta las máquinas del taller y despliegue del sistema en distintos puntos de trabajo del edificio, con soporte posterior a la implementación.",
    categories: ["Escritorio"],
    stack: ["Electron", "React", "Node.js", "SQLite", "HTML", "CSS"],
    status: "Entregado · 2025",
    featuredRank: 100,
    details: {
      problem:
        "El taller necesitaba controlar su inventario y conectar las máquinas de distintos puntos del edificio.",
      objective:
        "Implantar un sistema de inventario local con soporte posterior a la implementación.",
      features: [
        "Aplicación de escritorio con base de datos local SQLite.",
        "Copias de seguridad y resolución de incidencias.",
        "Instalación de la red que conecta las máquinas del taller.",
        "Despliegue del sistema en distintos puntos de trabajo del edificio.",
        "Soporte posterior a la implementación.",
      ],
      architecture: [
        "Electron con React y Node.js.",
        "SQLite como base de datos local.",
      ],
    },
    media: null,
    links: {
      repo: null,
      demo: null,
      release: null,
    },
    demoVideo: null,
  },

  {
    id: "packet-tracer-mcp-mitm",
    short: "Packet Tracer MCP",
    title: "Packet Tracer MCP & MITM",
    subtitle: "Automatización de redes Cisco con Model Context Protocol",
    shortDescription:
      "Servidor MCP con plugin PTBuilder para desplegar topologías y un laboratorio de ataque MITM.",
    longDescription:
      "Entorno de automatización de redes Cisco sobre Packet Tracer 8.2.2 con Python 3.11: servidor Model Context Protocol (MCP), plugin PTBuilder para scripting, bridge HTTP entre MCP y Packet Tracer, despliegue automático de topologías y laboratorio educativo de ataque Man in the Middle. El proyecto documenta su arquitectura, instalación y uso, con la wiki formal en progreso.",
    categories: ["Seguridad", "Automatización"],
    stack: ["Python", "MCP", "Packet Tracer", "HTTP"],
    status: "Activo",
    featuredRank: 110,
    details: {
      problem:
        "Desplegar topologías de red en Packet Tracer a mano es lento y difícil de reproducir.",
      objective:
        "Automatizar el despliegue de topologías Cisco y documentar un laboratorio educativo de ataque Man in the Middle.",
      features: [
        "Servidor Model Context Protocol (MCP).",
        "Plugin PTBuilder para scripting.",
        "Bridge HTTP entre MCP y Packet Tracer.",
        "Despliegue automático de topologías.",
        "Laboratorio educativo de ataque Man in the Middle.",
      ],
      architecture: [
        "Python 3.11 sobre Packet Tracer 8.2.2.",
        "El proyecto documenta su arquitectura, instalación y uso; la wiki formal está en progreso.",
      ],
    },
    media: null,
    links: {
      repo: "https://github.com/Charles-X-Core/packet-tracer-mcp-mitm",
      demo: null,
      release: null,
    },
    demoVideo: null,
  },

  {
    id: "azure-projects",
    short: "Azure Projects",
    title: "Azure Projects",
    subtitle: "Laboratorios y automatizaciones en Microsoft Azure",
    shortDescription:
      "Servidor web en Ubuntu sobre Azure VM, backend de sincronización para app Android y control de costos.",
    longDescription:
      "Colección de proyectos prácticos en Microsoft Azure documentados desde la certificación AZ-900: servidor web Ubuntu con Nginx en una Azure VM configurada con custom data e integrada con GitHub, arquitectura backend para una app Android con SQLite sincronizada contra MySQL alojado en Azure, y un optimizador de costos con presupuestos y alertas en desarrollo. Incluye guiones de PowerShell y Azure CLI para crear recursos de forma automatizada.",
    categories: ["Cloud & DevOps", "Automatización"],
    stack: [
      "Azure",
      "Ubuntu",
      "Nginx",
      "MySQL",
      "Node.js",
      "Android",
      "PowerShell",
      "Azure CLI",
    ],
    status: "En desarrollo",
    featuredRank: 120,
    details: {
      objective:
        "Documentar proyectos prácticos de Azure desde la certificación AZ-900.",
      features: [
        "Servidor web Ubuntu con Nginx en una Azure VM configurada con custom data e integrada con GitHub.",
        "Arquitectura backend para una app Android con SQLite sincronizada contra MySQL alojado en Azure.",
        "Optimizador de costos con presupuestos y alertas, en desarrollo.",
        "Guiones de PowerShell y Azure CLI para crear recursos de forma automatizada.",
      ],
      architecture: [
        "Azure VM con Ubuntu y Nginx.",
        "MySQL alojado en Azure para la sincronización.",
        "Automatización con PowerShell y Azure CLI.",
      ],
    },
    media: null,
    links: {
      repo: "https://github.com/Charles-X-Core/azure-projects-charles",
      demo: null,
      release: null,
    },
    demoVideo: null,
  },
];
