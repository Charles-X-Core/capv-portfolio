# Fase 1 — Auditoría del portafolio Charles-X

Fecha: 2026-10-22
Rama: `feature/real-projects-and-demos`
Alcance: análisis únicamente. No se modificó código, no se copiaron imágenes,
no se ejecutaron comandos de Git de escritura.

---

## 1. Estado real de Git

| Comprobación | Resultado |
|---|---|
| `git branch --show-current` | `feature/real-projects-and-demos` ✅ (la esperada) |
| `git log -5 --oneline` | `3f5008a feat: improve portfolio projects and update CV` (HEAD) |
| Archivos modificados sin commit | 7 |
| Archivos nuevos sin trackear | 6 |

```
 M package.json
 M src/components/projects/ProjectCard.jsx
 M src/components/projects/ProjectMedia.jsx
 M src/components/projects/Projects.css
 M src/components/projects/Projects.jsx
 M src/components/projects/projectFilters.js
 M src/components/projects/projects.data.js
?? .perch/
?? docs/demos.md
?? public/demos/
?? public/mockups/tubetoalbum-icon.svg
?? scripts/projects.test.mjs
?? src/components/projects/ProjectDemoModal.jsx
```

**Dato importante:** el commit `3f5008a` contiene solo **3 proyectos**
(`inventario`, `devops`, `batimusic`). Las 12 tarjetas existen únicamente en el
árbol de trabajo sin commitear. Todo el trabajo de "Proyectos Destacados" está
sin versionar. No se tocó nada.

`main`, `origin/main` y `feature/portfolio-improvements` apuntan al mismo commit
`3f5008a`.

---

## 2. Arquitectura encontrada

SPA React 19 + Vite 7, sin router, sin estado global. Secciones por componente,
cada una con su CSS propio importado desde el `.jsx`.

```
src/components/projects/
├── Projects.jsx          237 líneas — orquesta estado, filtros, modal
├── ProjectCard.jsx       179 líneas — tarjeta individual
├── ProjectMedia.jsx       31 líneas — img o video
├── ProjectDemoModal.jsx  182 líneas — reproductor en portal
├── projectFilters.js      63 líneas — lógica pura de filtrado
├── projects.data.js      376 líneas — 12 proyectos
└── Projects.css         1105 líneas — estilos + responsive + modal
```

Separación limpia: `projectFilters.js` es lógica pura sin React, lo que permite
probarla con `node --test` sin DOM. Ese es el acierto estructural del módulo.

### Flujo de estado

`Projects.jsx` mantiene tres estados: `activeCategory`, `query` y `demoProject`.
`visibleProjects` se deriva con `useMemo` sobre `filterProjects`. El modal se
monta con `AnimatePresence` y recibe el objeto proyecto completo.

### Cómo se representan los proyectos

Cada proyecto es un objeto plano en `projects.data.js` con esta forma:

```js
{
  id, short, title, subtitle,
  shortDescription, longDescription,
  categories: [], stack: [],
  status,
  media: { type, src, alt } | null,
  links: { repo, demo, release, releaseLabel },
  demoVideo: { src, poster, title, duration } | null,
  demosExtra: [] // solo Optimal Health Now
}
```

No hay campo de orientación, ni logo, ni imagen principal separada del poster.
`media` y `demoVideo.poster` suelen apuntar al **mismo archivo**.

---

## 3. Cómo funcionan tarjetas, miniaturas, filtros y modal

### Tarjetas
Grid `auto-fit` con `minmax(min(100%, 320px), 1fr)`. La tarjeta es un
`<motion.article>` con `height: 100%` para igualar alturas.

### Miniaturas
`.project-card-media` tiene **`aspect-ratio: 16 / 9` fijo** y
`.project-media img, .project-media video` usa **`object-fit: cover`**.
Consecuencia directa: cualquier contenido vertical se **recorta** para llenar
16:9. Esto es exactamente lo que rompería un video de móvil.

Si no hay `media`, se pinta un monograma con las iniciales del título
(`getMonogram`).

### El play superpuesto (lo que hay que quitar)
`ProjectCard.jsx` líneas 80-92 renderiza un `<button class="project-media-play">`
que en CSS (líneas 791-849) es:

```css
.project-media-play {
  position: absolute;
  inset: 0;          /* cubre TODA la tarjeta */
  z-index: 3;
  background: radial-gradient(...);
}
```

Y dentro, `.project-media-play-icon` es el círculo azul de 3.1rem con
`border-radius: 50%` y degradado azul. Es un overlay de pantalla completa con un
círculo centrado: por eso se ve "encima" de la miniatura. Eliminarlo es quitar
ese botón y su bloque CSS.

### Filtros
`getCategoryOptions` cuenta categorías dinámicamente y antepone "Todos".
`filterProjects` normaliza texto (quita acentos con NFD, minúsculas es) y exige
que **todos** los tokens aparezcan. Busca en título, subtítulo, descripciones,
stack, categorías y el array `description`.

### Modal
`ProjectDemoModal` se monta en un portal a `document.body`. Ya resuelve bien:
bloqueo de scroll, foco atrapado con Tab, cierre con Escape y clic en fondo,
devolución de foco al botón que lo abrió, pausa al cerrar, y respeto a
`prefers-reduced-motion`. El video arranca **mudo** con `controls` nativos.

Limitación actual para vertical: `.project-demo-video` es `width: 100%` con
`max-height: 62vh`. Un video 9:19.5 a ancho completo desbordaría la altura y
quedaría con scroll interno en lugar de encajar.

---

## 4. Inventario de medios (metadatos reales vía ffprobe)

### Videos ya en el repositorio

| Archivo | Bytes | Resolución | Relación | Duración | Orientación |
|---|---|---|---|---|---|
| `public/demos/clinica-dental-pro.mp4` | 1,341,345 | 1280×686 | 1.87:1 | 1:44.6 | Panorámico |
| `public/demos/optimal-erp.mp4` | 1,333,652 | 1280×644 | 1.99:1 | 2:12.5 | Panorámico |
| `public/demos/optimal-landing.mp4` | 5,589,079 | 1280×640 | 2.00:1 | 1:43.7 | Panorámico |
| `public/demos/track-pays.mp4` | 1,223,085 | 1280×638 | 2.01:1 | 1:38.0 | Panorámico |
| `public/demos/fakelove-pdf-tools.mp4` | 1,096,133 | 1280×626 | 2.04:1 | 1:52.6 | Panorámico |
| `public/mockups/inventario.mp4` | 4,957,605 | 740×404 | 1.83:1 | 1:00.3 | Panorámico (contenido móvil) |
| `public/mockups/devops-demo.mp4` | 2,257,055 | 1272×410 | 3.10:1 | 0:10.9 | Ultra-panorámico |

Todos H.264 + AAC, 30 fps, reproducibles en navegador.

### Imágenes en el repositorio

| Archivo | Bytes | Resolución | Relación |
|---|---|---|---|
| `public/demos/posters/clinica-dental-pro.jpg` | 22,474 | 1280×686 | 1.87:1 |
| `public/demos/posters/optimal-erp.jpg` | 43,316 | 1280×644 | 1.99:1 |
| `public/demos/posters/optimal-landing.jpg` | 56,126 | 1280×640 | 2.00:1 |
| `public/demos/posters/track-pays.jpg` | 71,940 | 1280×638 | 2.01:1 |
| `public/demos/posters/fakelove-pdf-tools.jpg` | 12,437 | 1280×626 | 2.04:1 |
| `public/demos/posters/sistema-inventario.jpg` | 30,212 | 1280×698 | 1.83:1 |
| `public/demos/posters/devops-manager.jpg` | 31,341 | 1280×412 | 3.11:1 |
| `public/mockups/DevOpsManager.png` | 45,591 | 1010×440 | 2.30:1 |
| `public/mockups/batimusic-banner.png` | 2,364,576 | 1536×1024 | 1.50:1 |
| `public/mockups/tubetoalbum-icon.svg` | 1,043 | vector | — |

### Originales en `C:\Users\USUARIO\Desktop\Videos` (WSL: `/mnt/c/...`)

Los 8 originales siguen disponibles. **No se modificó ninguno.**

| Archivo | Bytes | Resolución | Relación | Duración | Orientación |
|---|---|---|---|---|---|
| `Albumica Demo.mp4` | 67,771,214 | **482×1038** | **0.46:1** | 3:56.0 | **VERTICAL** |
| `Erp OPtimal.mp4` | 230,772,983 | 2552×1282 | 1.99:1 | 2:12.5 | Panorámico |
| `FakeLove.mp4` | 191,725,441 | 2558×1250 | 2.05:1 | 1:52.6 | Panorámico |
| `Pagina Optimal.mp4` | 180,326,331 | 2556×1278 | 2.00:1 | 1:43.7 | Panorámico |
| `TRACKPAYS.mp4` | 170,424,636 | 2558×1276 | 2.00:1 | 1:38.0 | Panorámico |
| `TubetoAlbum.mp4` | 13,528,771 | 1090×796 | 1.37:1 | 0:28.1 | Casi 4:3 |
| `TubetoAlbum2.mp4` | 7,224,678 | 1094×786 | 1.39:1 | 0:15.2 | Casi 4:3 |
| `Vita Mirabilis.mp4` | 195,232,657 | 2558×1372 | 1.86:1 | 1:44.6 | Panorámico |

**Solo un video vertical existe: `Albumica Demo.mp4`.**

### Hallazgo sobre el video de Albumica

El video **ya incluye el marco del teléfono**: esquinas redondeadas, barra de
estado (12:25, wifi, batería), isla dinámica y el indicador de inicio. Verificado
extrayendo fotogramas en 0:08 y 2:00.

Esto cambia el diseño pedido: si se envuelve en un marco CSS de teléfono, queda
**doble marco**. La recomendación es usar el video tal cual, con esquinas
redondeadas y sombra, sin dibujar un bisel encima.

---

## 5. Estado de cada proyecto

| # | Proyecto | Media actual | Video | Verificación visual |
|---|---|---|---|---|
| 1 | Clínica Dental Pro | poster JPG | ✅ 1:44 | ✅ Captura real (odontograma) |
| 2 | Optimal Health Now | poster JPG | ✅ 2 clips | ✅ Captura real (panel doctora + landing) |
| 3 | Track Pays | poster JPG | ✅ 1:38 | ✅ Captura real (login) |
| 4 | FakeLove PDF Tools | poster JPG | ✅ 1:52 | ✅ Captura real (unir PDF) |
| 5 | TubeToAlbum | icono SVG | ❌ | ⚠️ Icono, no captura. **Hay 2 videos sin usar** |
| 6 | Inventario Android | poster JPG | ✅ 1:00 | ✅ Captura real (lista de stock) |
| 7 | DevOps Manager | PNG | ⚠️ dudoso | ⚠️ Ver hallazgo 6.2 |
| 8 | BatiMusic | banner PNG | ❌ | ⚠️ Banner promocional, no UI |
| 9 | Albumica | **null** | **null** | ⚠️ **Hay video vertical sin usar** |
| 10 | Mecánica Robocop | null | null | Monograma |
| 11 | Packet Tracer MCP | null | null | Monograma |
| 12 | Azure Projects | null | null | Monograma |

Los 9 proyectos que el usuario quiere presentar **ya están todos** en el
catálogo. No hay que duplicar ninguno.

---

## 6. Discrepancias encontradas

### 6.1 `docs/demos.md` está desactualizado
El documento afirma:
- "Albumica: sin repositorio público **y sin video en la carpeta**" → **falso**,
  `Albumica Demo.mp4` existe (3:56, vertical).
- "TubeToAlbum: **sin video**" → **falso**, hay `TubetoAlbum.mp4` y
  `TubetoAlbum2.mp4`.
- La tabla de originales lista 5 archivos; hoy hay 8.

### 6.2 Los medios de DevOps Manager no coinciden con el proyecto
Verificado extrayendo fotogramas:

- `public/demos/posters/devops-manager.jpg` muestra la **barra de navegación del
  propio portafolio (CAPV)** y el panel "Seleccionar proyecto" de la sección
  Proyectos. Es una captura del portafolio, no de DevOps Manager.
- `public/mockups/devops-demo.mp4` (0:11) muestra la sección **Experience** del
  portafolio desplazándose. No es la aplicación.
- `public/mockups/DevOpsManager.png` **sí** parece una captura real de la app.

**Requiere confirmación del usuario antes de reutilizar estos dos archivos.**

### 6.3 `sistema-inventario.jpg` es una pantalla de login
El poster de Inventario muestra una pantalla de acceso con un logo de llama y
circuito, no la lista de inventario. Es coherente con los primeros fotogramas de
`inventario.mp4` (mismo origen), pero **no es la mejor imagen principal**: la
lista de stock con SKU, lotes y unidades aparece más adelante en el video y
representa mejor la app.

### 6.4 El video de Inventario es contenido móvil en lienzo horizontal
`inventario.mp4` es 740×404, pero el contenido es una pantalla de teléfono
centrada con relleno a los lados. `cropdetect` confirma que no hay recorte
posible: el archivo completo es 740×404. Para la composición de teléfono habría
que **recortar el contenido real** del video, no usar el archivo tal cual.

### 6.5 `batimusic-banner.png` pesa 2.36 MB
Es la imagen más pesada del módulo y es un banner promocional 1536×1024, no una
captura de interfaz.

---

## 7. Modelo de datos propuesto

Compatible hacia atrás: `media` y `demoVideo` se conservan intactos, y se añade
un bloque opcional `presentation`. Nada de lo existente se rompe, y las pruebas
actuales siguen pasando sin cambios.

```js
presentation: {
  layout: "wide" | "phone",        // panorámico vs composición móvil

  hero: {                          // imagen principal de la aplicación
    src: "/demos/posters/x.jpg",
    alt: "Descripción real de la pantalla",
  },

  logo: {                          // opcional, para el panel izquierdo
    src: "/demos/logos/x.svg",
    alt: "Logotipo de X",
  } | null,

  demo: {
    src: "/demos/x.mp4",
    poster: "/demos/posters/x.jpg",
    title: "Recorrido por X",
    duration: "1:38",
    orientation: "landscape" | "portrait",
    aspect: 16 / 9,                // 9/19.5 para vertical
    hasDeviceFrame: true,          // true en Albumica: NO añadir bisel CSS
    crop: null | { x, y, w, h },   // recorte de contenido (Inventario)
  } | null,

  extra: [ /* mismo shape que demo */ ],
}
```

Reglas de derivación, para no duplicar datos:
- Si `presentation` no existe → `layout: "wide"`, `hero: media`,
  `demo: demoVideo`. Comportamiento actual, cero regresiones.
- `orientation` se puede inferir de `aspect < 1`, pero se declara explícito
  porque el CSS no debe adivinar.
- `hasDeviceFrame` evita el doble marco en Albumica.

---

## 8. Componentes a modificar y orden de implementación

### Orden recomendado

1. **`projects.data.js`** — añadir `presentation` a los 12 proyectos. Empezar
   por los 4 que ya tienen material verificado (Clínica, Optimal, Track Pays,
   FakeLove). Sin cambios visuales todavía.

2. **`scripts/projects.test.mjs`** — extender las pruebas **antes** de tocar la
   UI: validar que `presentation.hero.src` existe en `public/`, que
   `orientation` es un valor permitido, que `aspect` es coherente con
   `orientation`, y que ningún proyecto declara `layout: "phone"` sin
   `demo.orientation === "portrait"`. Así la UI se construye contra un contrato.

3. **`ProjectMedia.jsx`** — añadir prop `variant` (`"wide" | "phone"`).
   En `phone`: `object-fit: contain` en vez de `cover`, y sin recorte.

4. **`ProjectCard.jsx`** — quitar el `<button class="project-media-play">`
   completo (líneas 80-92). Sustituirlo por una acción discreta en el cuerpo de
   la tarjeta, junto a los enlaces, con el texto "Ver demo". **Mantener un
   `<button>` real**: es el único punto de entrada por teclado al modal.

5. **`Projects.css`** — eliminar el bloque `.project-media-play` (791-849) y sus
   referencias en `prefers-reduced-motion` (1099-1104). Añadir
   `.project-card-media--phone` con `aspect-ratio: 9 / 19.5` y fondo neutro.

6. **Nuevo `ProjectShowcase.jsx`** — composición de dos paneles para `layout:
   "phone"`. Izquierda: título, descripción, funcionalidades, stack, enlaces.
   Derecha: el video vertical. `grid-template-columns: minmax(0, 1fr) auto` en
   escritorio; una sola columna por debajo de ~860px.

7. **`ProjectDemoModal.jsx`** — respetar `orientation`. Para vertical:
   `max-height: 78vh; width: auto; max-width: min(420px, 100%)` y centrado, en
   lugar de `width: 100%`.

8. **`docs/demos.md`** — actualizar la tabla de originales (8 archivos), corregir
   las afirmaciones sobre Albumica y TubeToAlbum, y documentar el modelo nuevo.

### Sobre el marco de teléfono
No dibujar un bisel CSS para Albumica: el video ya lo trae. Aplicar solo
`border-radius`, `overflow: hidden` y sombra. Si más adelante llega un video
vertical **sin** marco, entonces sí usar el marco CSS, controlado por
`hasDeviceFrame`.

---

## 9. Riesgos

### Rendimiento
- `object-fit: cover` sobre 16:9 recorta cualquier vertical. Es el riesgo
  principal y se resuelve con `contain` + aspect-ratio propio.
- `optimal-landing.mp4` pesa 5.4 MB, el mayor del módulo. Con `preload="metadata"`
  y montaje solo al abrir el modal, es aceptable, pero conviene mantener esa
  disciplina.
- `batimusic-banner.png` (2.36 MB) debería recomprimirse a WebP o JPEG.
- El build ya avisa: **505.71 kB** en un solo chunk JS (>500 kB). No es un fallo,
  pero conviene `manualChunks` para separar React Flow y Framer Motion.
- `public/icons/` pesa **58 MB** en total. No afecta al bundle, pero infla el
  despliegue.

### Accesibilidad
- Quitar el overlay de play **no debe** quitar el botón. Sin él, el modal deja de
  ser alcanzable con teclado. El botón nuevo necesita `aria-label` explícito.
- Un video vertical dentro de un marco decorativo: el marco debe ser
  `aria-hidden="true"` y el `<video>` conservar su `aria-label`.
- El modal ya atrapa el foco correctamente; al añadir el panel de showcase hay
  que asegurar que no introduce elementos enfocables fuera del diálogo.
- Contraste: el texto sobre el degradado del overlay desaparece al eliminarlo,
  así que no hay regresión ahí.

### Compatibilidad
- Todos los videos son H.264/AAC: compatible con Safari, Chrome, Firefox y
  Android. Sin riesgo de codec.
- `aspect-ratio` y `color-mix()` ya se usan en el proyecto; el navegador objetivo
  los soporta.
- El video vertical de Albumica es 482×1038 (0.46:1). Un `aspect-ratio: 9/19.5`
  (0.4615) encaja casi exacto: diferencia despreciable, sin deformación.
- `prefers-reduced-motion` ya está cubierto en tarjeta y modal; el showcase debe
  respetarlo también (sin autoplay).

---

## 10. Pruebas ejecutadas (resultados reales)

```
npm run lint   → exit 0, sin errores ni warnings
npm test       → 10 tests, 10 pass, 0 fail (50 ms)
npm run build  → exit 0, built in 2.46s
                 478 módulos transformados
                 dist/assets/index-*.css   92.29 kB (gzip 17.19 kB)
                 dist/assets/index-*.js   505.71 kB (gzip 163.37 kB)
                 ⚠️ warning: chunk > 500 kB
```

Las 10 pruebas que pasan:
1. identificadores únicos y campos obligatorios
2. contadores de categoría correctos
3. filtro por categoría
4. búsqueda por nombre, descripción y tecnología
5. búsqueda sin acentos y multi-término
6. combinación categoría + búsqueda
7. estado vacío
8. medios y demos apuntan a archivos existentes en `public/`
9. enlaces externos son https o null
10. solo proyectos con video verificado exponen `demoVideo`

El informe anterior era correcto: lint, build y 10 pruebas pasan. Confirmado por
ejecución propia, no asumido.

**Cobertura ausente:** ninguna prueba valida orientación, relación de aspecto ni
el nuevo modelo `presentation`. Eso hay que añadirlo en el paso 2.

---

## 11. Dudas que requieren al usuario

1. **DevOps Manager** — `devops-manager.jpg` y `devops-demo.mp4` parecen capturas
   del propio portafolio, no de la aplicación. ¿Se descartan, o hay material real
   de DevOps Manager?
2. **Albumica** — existe `Albumica Demo.mp4` vertical (3:56) sin usar. ¿Se
   incorpora? ¿Y hay logo o capturas estáticas?
3. **TubeToAlbum** — hay dos videos (`TubetoAlbum.mp4` 0:28 y `TubetoAlbum2.mp4`
   0:15). ¿Cuál es el bueno, o se usan ambos como clips?
4. **Inventario** — el video trae contenido móvil con relleno lateral. ¿Se recorta
   al contenido real para la composición de teléfono, o se deja tal cual?
5. **BatiMusic** — solo hay un banner promocional. ¿Hay captura real de interfaz?
6. **Logos** — no existe ningún logo de proyecto en el repositorio. El panel
   izquierdo del showcase los necesita.
7. **Mecánica Robocop, Packet Tracer MCP, Azure Projects** — sin material. ¿Se
   quedan con monograma o hay capturas?
8. **Imagen principal** — para Clínica Dental Pro, Optimal, Track Pays y FakeLove
   el poster actual es el **primer fotograma del video**. ¿Se usa como imagen
   principal o se entrega una captura aparte?

---

## Estado

Análisis cerrado. Nada modificado, nada copiado, nada commiteado.

**Esperando las imágenes, logos y confirmaciones del usuario antes de iniciar la
implementación visual.**
