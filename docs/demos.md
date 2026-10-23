# Demos en video y repositorios verificados

Documento de referencia de la sección **Proyectos Destacados**: de dónde sale cada
dato, qué videos están incorporados y qué queda pendiente de confirmar.

> Todo lo que sigue fue verificado contra la API pública de GitHub, los README de
> los repositorios, los registros del dispositivo y los archivos locales.
> No se incluyen datos inventados.

---

## 1. Repositorios públicos verificados (`Charles-X-Core`)

| Repositorio | URL | Verificado | Notas |
|---|---|---|---|
| odontologia-sistema | https://github.com/Charles-X-Core/odontologia-sistema | 200 · MIT · release v1.2.1 | Electron 35, Node 22, React 19, SQLite 3. Releases: https://github.com/Charles-X-Core/odontologia-sistema/releases |
| medical-erp | https://github.com/Charles-X-Core/medical-erp | 200 | Java 21, Spring Boot 3, Spring Security 6, MySQL 8, React + Vite + PWA. Roles `DOCTORA` / `ENFERMERA` y módulos `agenda`, `citas`, `pacientes`, `documentos` |
| TubeToAlbum | https://github.com/Charles-X-Core/TubeToAlbum | 200 · release v1.0.0 | Python 3.11, Electron, FFmpeg, CLI incluida. Instalador: https://github.com/Charles-X-Core/TubeToAlbum/releases/tag/v1.0.0 |
| Track-Pays | https://github.com/Charles-X-Core/Track-Pays | 200 · demo viva 200 | Angular 21, TypeScript 5.9, Firebase, Vercel. Demo: https://track-pays.vercel.app |
| FakeLove-PDF-Tools | https://github.com/Charles-X-Core/FakeLove-PDF-Tools | 200 · demo viva 200 | Next.js 14, TypeScript, SCSS. Demo: https://fake-love-pdf-tools.vercel.app |
| packet-tracer-mcp-mitm | https://github.com/Charles-X-Core/packet-tracer-mcp-mitm | 200 · MIT | Python 3.11, MCP, Packet Tracer 8.2.2, laboratorio MITM |
| azure-projects-charles | https://github.com/Charles-X-Core/azure-projects-charles | 200 | Azure VM, Ubuntu, Nginx, MySQL, Node.js, Android, PowerShell, Azure CLI |
| farmacia-inventario | https://github.com/Charles-X-Core/farmacia-inventario | 200 | Laravel 12 (capstone) — **no incorporado** (fuera del foco del portafolio) |
| GunnersRunners | https://github.com/Charles-X-Core/GunnersRunners | 200 | GameMaker LTS 2026 — **no incorporado** (juego, sin encaje con el perfil web) |
| APP-DATE | https://github.com/Charles-X-Core/APP-DATE | 200 | Kotlin — **no incorporado** (sin README ni demo verificable) |
| capv-portfolio | https://github.com/Charles-X-Core/capv-portfolio | 200 | Este mismo portafolio |

### Repositorios que **no existen** de forma pública

- `Albumica`: no hay repositorio público. Solo se conocen los registros del
  dispositivo (`com.albumica.app.debug`, Kotlin + Jetpack Compose + AndroidX
  Media3, API InnerTube de YouTube, target SDK 35). Por eso la ficha de Albumica
  **no lleva enlace ni demo**.
- `odontologia-sistema-electron`: el nombre exacto del repositorio es
  `odontologia-sistema` (Electron está entre sus topics).
- `Optimal Health Now`: no hay repositorio con ese nombre; el ERP entregado está
  publicado como `medical-erp`.
- `BatiMusic`, `DevOps Manager` y el `Sistema de Inventario` (Android): no tienen
  repositorio público, por lo que sus fichas no inventan enlaces.

### Otros repositorios públicos (38 en total)

Lista completa consultada: `capv-portfolio`, `Charles-X-Core`,
`farmacia-inventario`, `medical-erp`, `TubeToAlbum`, `flores-para-ti`,
`Track-Pays`, `odontologia-sistema`, `Carta`, `GunnersRunners`, `yoyo-evolve`
(fork), `FakeLove-PDF-Tools`, `packet-tracer-mcp-mitm`, `valentines-game`,
`APP-DATE`, `valentines-8bit`, `valentines-chat`, `portfolio-backend`,
`Inventario_MInimarket`, `azure-projects-charles`, `SAGA-FALABELLA`,
`Proyecto_Desplegar`, `gestion-rrhh-davincitech`, `Davinchi_Tech`,
`TF_Davinci_Tech_`, `TF_DavinciTec`, `Led_Blueetooth`, `TF_DavinciTech`,
`Coolbox`, `T2_Picho_Vargas`, `Tailoy_Inventario`, `Proyecto_Inventario`,
`Inventario_Tai_Loy`, `Inventario-Tai-loy`, `Gunners-Revengers-`,
`Base-de-datos-Avanzados`, `ESP32-WEB-SERVER` (fork), `programa-git`.

**Recomendados para incorporar más adelante**: `flores-para-ti` (demo viva
verificada), `yoyo-evolve` (agente de IA que se auto-modifica), `APP-DATE` (Kotlin
móvil) y `gestion-rrhh-davincitech` (TypeScript). Los ejercicios de coursework
(`programa-git`, `Base-de-datos-Avanzados`, `Inventario_Tai_Loy`) y los proyectos
de San Valentín no aportan a la narrativa profesional.

---

## 2. Videos locales encontrados

Origen: `C:\Users\USUARIO\Desktop\Videos` (accedido desde WSL como
`/mnt/c/Users/USUARIO/Desktop/Videos`). Todos son MP4/H.264 (`avc1`) + AAC
(`mp4a`), por lo que se reproducen en navegadores modernos.

| Archivo original | Tamaño | Duración | Resolución | Asignación |
|---|---|---|---|---|
| `Erp OPtimal.mp4` | 220,08 MB | 2:12 | 2552x1282 | Optimal Health Now — ERP médico |
| `Pagina Optimal.mp4` | 171,97 MB | 1:44 | 2556x1278 | Optimal Health Now — landing page |
| `Vita Mirabilis.mp4` | 186,19 MB | 1:45 | 2558x1372 | Clínica Dental Pro (`odontologia-sistema`) |
| `TRACKPAYS.mp4` | 162,53 MB | 1:38 | 2558x1276 | Track-Pays |
| `FakeLove.mp4` | 182,84 MB | 1:53 | 2558x1250 | FakeLove PDF Tools |

Cada asignación se confirmó visualmente revisando fotogramas: la interfaz
"Estación de Datos / Odontograma" con marca *Vita Mirabilis*, el "Panel de la
Doctora", la landing de servicios médicos, el login de Track Pays y la herramienta
"Unir PDF" de FakeLove.

### Vídeos ya presentes en el repositorio

| Archivo | Tamaño | Duración | Resolución | Uso |
|---|---|---|---|---|
| `public/mockups/inventario.mp4` | 4,73 MB | 1:00 | 740x404 | Demo del Sistema de Inventario (Android). Miniatura: `public/demos/posters/sistema-inventario.jpg` |
| `public/mockups/devops-demo.mp4` | 2,15 MB | 0:11 | 1272x410 | Demo de DevOps Manager. Miniatura: `public/demos/posters/devops-manager.jpg` |

---

## 3. Conversión aplicada (los originales NO se tocaron)

Los archivos de Windows pesan 160-220 MB cada uno, así que **no se copiaron tal
cual**. Se recodificaron con el `ffmpeg` ya instalado en el equipo
(`C:\Program Files\TRCCCAP\ffmpeg.exe`) y el resultado quedó en `public/demos/`:

```bash
ffmpeg -i <ORIGINAL> \
  -vf "scale=1280:-2:flags=lanczos" \
  -c:v libx264 -preset medium -crf 26 -pix_fmt yuv420p \
  -profile:v high -level 4.0 \
  -c:a aac -b:a 96k -ac 2 \
  -movflags +faststart \
  <DESTINO>.mp4
```

| Archivo incorporado | Tamaño | Miniatura |
|---|---|---|
| `public/demos/clinica-dental-pro.mp4` | 1,3 MB | `public/demos/posters/clinica-dental-pro.jpg` (22 KB) |
| `public/demos/optimal-erp.mp4` | 1,3 MB | `public/demos/posters/optimal-erp.jpg` (43 KB) |
| `public/demos/optimal-landing.mp4` | 5,4 MB | `public/demos/posters/optimal-landing.jpg` (55 KB) |
| `public/demos/track-pays.mp4` | 1,2 MB | `public/demos/posters/track-pays.jpg` (71 KB) |
| `public/demos/fakelove-pdf-tools.mp4` | 1,1 MB | `public/demos/posters/fakelove-pdf-tools.jpg` (13 KB) |

Total del material nuevo: **~10,3 MB de video + ~265 KB de miniaturas**.

Los originales permanecen intactos en `C:\Users\USUARIO\Desktop\Videos`.

---

## 4. Pendiente de confirmar

- **Albumica**: sin repositorio público y sin video en la carpeta. La ficha existe
  con la información que se puede probar (Kotlin, Jetpack Compose, Media3), pero
  sin enlace ni demo.
- **TubeToAlbum**: sin video. Se puede grabar una demo del instalador o usar el
  icono del repositorio como portada (ya incorporado).
- **Mecánica Robocop**, **BatiMusic**, **Azure Projects** y **Packet Tracer MCP**:
  sin material audiovisual propio; usan la portada de reserva con monograma.
- **Optimal Health Now**: no se encontró una URL pública de la landing ni del ERP,
  por lo que solo se enlaza el repositorio `medical-erp`.

---

## 5. Cómo se muestran las demos

- La tarjeta muestra una **miniatura** (`poster`) y un botón **"Ver demo en video"**.
  Ningún video se descarga al abrir la página: el `<video>` del reproductor usa
  `preload="metadata"` y solo se crea al abrir el modal.
- El reproductor ampliado (`ProjectDemoModal`) usa **controles nativos**, arranca
  **mudo** (nunca con sonido automático), y se cierra con el botón, con `Escape`
  o haciendo clic en el fondo. El foco queda atrapado dentro del diálogo y se
  devuelve al botón que lo abrió. Al cerrar, el video se pausa.
- Con `prefers-reduced-motion` no hay animaciones ni reproducción automática.
- Optimal Health Now tiene dos clips: el reproductor permite alternar entre el
  ERP y la landing.

---

## 6. Pruebas

```bash
npm test        # node --test scripts/projects.test.mjs
npm run lint
npm run build
```

`scripts/projects.test.mjs` valida los identificadores únicos, los contadores de
categoría, el filtrado, la búsqueda (con acentos y varios términos), la
combinación categoría + búsqueda, el estado vacío, **que cada medio y cada demo
apunte a un archivo existente en `public/`** y que los enlaces externos sean
URLs `https`.
