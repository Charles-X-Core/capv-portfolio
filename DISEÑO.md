# Documentación de Diseño - Portfolio CAPV

## Identidad Visual

### Colores

**Modo Oscuro (default)**
- `--bg-primary`: #0a0a0a (fondo principal)
- `--bg-secondary`: #111111 (fondos de tarjetas)
- `--bg-tertiary`: #1a1a1a (hover states)
- `--text-primary`: #ffffff
- `--text-secondary`: #a1a1a1
- `--accent`: #3b82f6 (azul principal)
- `--accent-hover`: #60a5fa

**Modo Claro**
- `--bg-primary`: #f8fafc
- `--bg-secondary`: #ffffff
- `--bg-tertiary`: #f1f5f9
- `--text-primary`: #0f172a
- `--text-secondary`: #64748b
- `--accent`: #2563eb

### Tipografía

- **Familia**: Inter (Google Fonts)
- **Pesos**: 400, 500, 600, 700, 800
- **Tamaños**:
  - Hero Title: 3.5rem - 4rem
  - Section Headers: 2.5rem
  - Body: 1rem - 1.125rem

### Espaciado

- Contenedor max-width: 1200px
- Padding sections: 80px vertical
- Gap grids: 24px - 32px

## Componentes UI

### Navbar
- Logo a la izquierda (CAPV / RedSparrow)
- Links centrales (Sobre mí, Experiencia, Proyectos)
- Acciones a la derecha (Theme toggle, CTA button)
- Scroll behavior: hide on scroll down, show on scroll up
- Mobile: hamburger menu con panel lateral

### Hero Section
- Grid background (patrón CSS)
- Badge de disponibilidad arriba
- Nombre con highlight en el apellido
- Roles con iconos
- Descripción profesional
- Botones: "Ver Proyectos" y "Descargar CV"
- Tech carousel inferior
- AtomicNetwork (React Flow) a la derecha

### About Section
- Avatar de perfil
- Título con enfoque técnico
- Descripción expandible (Read more/less)
- Botones de acción
- SkillGrid con habilidades técnicas
- Focus cards (Diseño sólido, Clean Code, Optimización)

### Experience Section
- Timeline vertical con labels
- Detalle con rol, empresa, período
- Bullets con logros
- Tech stack pills
- Link al CV completo

### Projects Section
- Selector lateral con lista de proyectos
- Panel principal con:
  - Título y subtítulo
  - Status badge
  - Stack tecnológico
  - Descripción larga
  - Media (video o imagen)
  - Acciones (demo/repo)
- Transición suave entre proyectos

### Contact Section
- Header con badge de disponibilidad
- Grid: formulario + info de contacto
- Campos: name, email, message
- Honeypot anti-spam (website field)
- Estados: loading, success, error

## Animaciones

### Framer Motion
- Scroll reveal en secciones
- Apple reveal (stagger) en About
- Transiciones en Proyectos/Experiencia (AnimatePresence)
- Hover effects en botones y cards

### Atomic Network (React Flow)
- Nodos interactivos
- Animación de nodos flotantes
- Conexiones visuales entre tecnologías

## Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

## Imágenes y Assets

- `/public/img/`: logo.png, tuerca.png, image_perfil.jpg
- `/public/icons/`: Iconos de tecnologías (40+)
- `/public/mockups/`: Videos e imágenes de proyectos
- `/public/cv/`: PDFs del currículum

## Accesibilidad

- Labels en botones
- Semantic HTML (sections, nav, header)
- Focus states
- ARIA labels donde corresponde

## SEO

- Meta tags básicos en index.html
- Title: "capv-portfolio"
- Description no configurada
- Open Graph no configurado