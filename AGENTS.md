# Portfolio CAPV - Documentación para Agentes IA

## Estructura del Proyecto

```
capv-portfolio/
├── src/
│   ├── components/
│   │   ├── about/           # Sección About + SkillGrid/SkillStack
│   │   ├── atomic-network/  # Visualización con React Flow
│   │   ├── contact/         # Formulario de contacto
│   │   ├── experience/      # Timeline experiencia profesional
│   │   ├── hero/            # Hero principal + AtomicNetwork
│   │   ├── hero-badge/      # Badge disponibilidad
│   │   ├── hero-tech/       # Carousel tecnologías
│   │   ├── layout/          # Navbar, Footer
│   │   ├── projects/        # Proyectos con ProjectCard/Media
│   │   └── scroll/          # ProgressiveScroll
│   ├── hooks/               # Custom hooks
│   ├── services/            # API services
│   ├── config/              # Configuración global
│   ├── animations/          # Variantes de animación
│   ├── data/                # Datos estáticos (skills, etc)
│   └── styles/              # CSS globals y variables
├── public/
│   ├── img/                 # Imágenes estáticas
│   ├── icons/               # Iconos de tecnologías
│   ├── mockups/             # Videos/imágenes de proyectos
│   └── cv/                  # PDFs de CV
└── index.html
```

## Stack Tecnológico

- **Frontend**: React 19 + Vite 7
- **Animaciones**: Framer Motion 12
- **Visualización**: @xyflow/react 12 (React Flow)
- **Email**: Resend API
- **Backend**: Railway (externo)

## Componentes Principales

### Hero
- `Hero.jsx`: Componente principal con AtomicNetwork, roles, y acciones
- `HeroBadge.jsx`: Badge de disponibilidad (available/busy/offline)
- `HeroTechCarousel.jsx`: Carrusel infinito de tecnologías
- `AtomicNetwork.jsx`: Red de nodos interactiva con React Flow

### Navbar
- `Navbar.jsx`: Responsive con menú móvil, theme toggle, scroll behavior
- Hooks: `useNavbarScroll`, `useNavbarLayout`, `useHideOnScroll`

### Projects
- `Projects.jsx`: Grid con selector lateral
- `ProjectCard.jsx`: Tarjeta de proyecto con media (video/imagen)
- `ProjectMedia.jsx`: Componente para renderizar video/image
- Datos: `projects.data.js`

### Experience
- `Experience.jsx`: Timeline con transición de contenido
- Datos: `experience.data.js`

### Contact
- `Contact.jsx`: Formulario con honeypot anti-spam
- Servicio: `contact.service.js` → API Railway

## Datos y Config

- `config/availability.js`: Estado de disponibilidad
- `config/heroTechs.js`: Tecnologías del carousel
- `data/skillsData/`: Skills organizados por categoría

## APIs

- **Contacto**: POST `https://portfolio-backend-production-99fb.up.railway.app/api/contact`

## Estado Actual

- ✅ Estructura completa de SPA
- ✅ Theme toggle (dark/light)
- ✅ Responsive design
- ✅ Animaciones con Framer Motion
- ✅ Formulario de contacto funcional
- ✅ Portafolio deployado

## Pendientes (Tech Improvements Branch)

Ver `tech-improvements-todo.md` para lista completa.