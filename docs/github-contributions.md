# Actividad de contribuciones de GitHub

El calendario de Engineering Core usa dos fuentes, en este orden:

1. **Función serverless de Vercel** (`api/github-contributions.js`). Consulta
   GitHub y devuelve un payload pequeño con fecha, conteo e intensidad diaria.
2. **Snapshot estático de respaldo**
   (`public/data/github-contributions.json`), generado por GitHub Actions.

El token de GitHub vive únicamente en el servidor de Vercel o en GitHub
Actions. Nunca se incluye en React, en una variable `VITE_*`, en el snapshot ni
en los logs.

## Función de Vercel

La ruta pública es:

```text
GET /api/github-contributions
```

La función:

- consulta `contributionsCollection.contributionCalendar` de la API GraphQL de
  GitHub para `Charles-X-Core`;
- valida que haya 52 semanas, sin huecos internos y con conteos enteros no
  negativos;
- devuelve solo fecha, conteo e intensidad por día;
- cachea la respuesta 15 minutos en el CDN de Vercel;
- no devuelve nombres de repositorios, mensajes, colaboradores ni metadatos
  privados.

### Configurar el token en Vercel

1. Crea un token de acceso personal **clásico** de GitHub con el permiso
   `read:user`.
2. En Vercel: **Project → Settings → Environment Variables**.
3. Añade `GITHUB_CONTRIBUTIONS_TOKEN` con el token.
4. No uses el prefijo `VITE_`; eso lo expondría al navegador.
5. Redespliega el proyecto.

Variables opcionales:

```text
GITHUB_LOGIN=Charles-X-Core
GITHUB_CONTRIBUTIONS_ALLOWED_ORIGIN=https://tu-dominio.com
```

`GITHUB_CONTRIBUTIONS_ALLOWED_ORIGIN` solo es necesario si el frontend y la
función están en dominios distintos. Si ambos están en Vercel, no hace falta.

Si despliegas la función en un proyecto Vercel separado, define en el frontend
la URL pública del proyecto de la API (no el token):

```text
VITE_CONTRIBUTIONS_API_URL=https://tu-proyecto-contribuciones.vercel.app
```

Esa variable solo contiene una URL y puede ser pública. El token sigue siendo
exclusivamente `GITHUB_CONTRIBUTIONS_TOKEN` en el servidor.

### Caché y comportamiento

- CDN de Vercel: `s-maxage=900` (15 minutos).
- Cliente: caché en memoria de 15 minutos y reintento de fallos cada 60
  segundos.
- La interfaz muestra la hora de generación del payload. No afirma que sea una
  consulta en vivo.

## Snapshot de respaldo

Si la función de Vercel no está configurada, falla o no está disponible, el
frontend intenta leer `public/data/github-contributions.json`. Ese archivo se
genera con el workflow `.github/workflows/update-github-contributions.yml`.

- Se ejecuta a diario a las `04:17 UTC`.
- También se ejecuta al hacer push a `feature/portfolio-improvements` si cambia
  el workflow o el script.
- Se puede iniciar manualmente desde **Actions → Update GitHub contribution
  snapshot → Run workflow**.
- Solo hace commit del snapshot cuando los datos son válidos y han cambiado.
- Necesita permiso `contents: write`.

El workflow usa `CONTRIBUTIONS_TOKEN` si existe. Si no, intenta el token
efímero de GitHub Actions (`github.token`), suficiente para contribuciones
públicas. El secreto es opcional, pero puedes configurarlo con el mismo PAT
clásico `read:user` si quieres usar una cuenta concreta.

## Privacidad

El payload contiene únicamente:

- `generatedAt`;
- `period.from` y `period.to`;
- total de contribuciones;
- fecha, conteo e intensidad diaria.

No contiene nombres de repositorios, mensajes de commits, colaboradores ni
detalles de repositorios privados. Si el perfil muestra contribuciones privadas
como agregado, el total puede incluirlas según la configuración de GitHub.

## Desarrollo local

`npm run dev` monta el mismo handler de `/api/github-contributions` como
middleware de Vite, así que la función se puede probar en local. El token debe
estar definido en la shell que inicia Vite:

```bash
GITHUB_CONTRIBUTIONS_TOKEN="<token>" \
GITHUB_LOGIN=Charles-X-Core \
npm run dev
```

Si no hay token, la API local responde `503` y el frontend prueba el snapshot.
También puedes usar `vercel dev` o generar el snapshot manualmente:

```bash
CONTRIBUTIONS_TOKEN="<token>" \
GITHUB_LOGIN=Charles-X-Core \
node scripts/generate-github-contributions.mjs
```

Nunca hagas commit de un token.

## Manejo de fallos

- Si la función no tiene token: responde `503` con
  `error.code = "not-configured"` y el frontend prueba el snapshot.
- Si GitHub falla o devuelve datos incompletos: responde `502` y el frontend
  prueba el snapshot.
- Si tampoco hay snapshot válido, la interfaz muestra el estado honesto de
  «pendiente» o de error, sin inventar actividad.
- Una ejecución fallida del workflow nunca reemplaza un snapshot válido por
  datos vacíos o incompletos.
