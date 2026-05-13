# Tech Improvements - Pendientes

## 🚨 Alta Prioridad

### SEO y Metadatos
- [ ] Agregar meta description en index.html
- [ ] Configurar Open Graph (og:title, og:description, og:image)
- [ ] Agregar favicon para temas claros/oscuros
- [ ] Configurar manifest.json para PWA

### Performance
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Comprimir videos de proyectos
- [ ] Implementar code splitting (React.lazy)
- [ ] Agregar service worker para offline

### Accesibilidad
- [ ] Audit WCAG (contrast ratio, keyboard nav)
- [ ] Agregar skip to content link
- [ ] Mejorar focus indicators
- [ ] Agregar alt texts a todas las imágenes

## 📌 Media Prioridad

### Código
- [ ] Agregar TypeScript (migración gradual)
- [ ] Agregar tests unitarios (Vitest + React Testing Library)
- [ ] Configurar ESLint con reglas más estrictas
- [ ] Eliminar código muerto (dead code)
- [ ] Revisar uso de matter-js (importado pero no usado?)

### SEO técnico
- [ ] Generar sitemap.xml
- [ ] Agregar robots.txt
- [ ] Configurar canonical URLs

### Imágenes
- [ ] Usar formatos modernos (WebP/AVIF)
- [ ] Implementar srcset para responsive images
- [ ] Agregar placeholder skeleton mientras cargan

## 🟡 Baja Prioridad

### UX
- [ ] Agregar toast notifications
- [ ] Mejorar transitions entre páginas
- [ ] Agregar keyboard shortcuts
- [ ] Implementar prefetch en hover

### Mantenibilidad
- [ ] Documentar componentes con Storybook
- [ ] Agregar Conventional Commits
- [ ] Configurar CI/CD con GitHub Actions

## Archivos Problemáticos

### src/app/api/contact/route.ts
- Este archivo no debería existir (pertenece a Next.js)
- El proyecto usa Vite, no tiene lógica de API del lado del servidor
- El backend está desplegado por separado en Railway

### Carpetas vacías o sin uso
- [ ] Verificar si `src/data/skillsData/` tiene contenido

## Notas

- El proyecto está deployado y funcional
- El backend de contacto está en Railway: `portfolio-backend-production-99fb.up.railway.app`
- El formulario usa honeypot para evitar spam
- Tema actual: funcionalidad completa, solo faltan mejoras técnicas