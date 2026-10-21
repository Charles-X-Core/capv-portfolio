import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import githubContributionsHandler from './api/github-contributions.js'

// Vercel serves /api automatically. During `npm run dev` there is no Vercel
// runtime, so the same server-only handler is mounted as a Vite middleware.
function githubContributionsDevServer() {
  return {
    name: 'github-contributions-dev-server',
    configureServer(server) {
      server.middlewares.use('/api/github-contributions', (request, response) => {
        Promise.resolve(githubContributionsHandler(request, response)).catch(
          (error) => {
            if (response.headersSent) return

            response.statusCode = 500
            response.setHeader(
              'Content-Type',
              'application/json; charset=utf-8'
            )
            response.end(
              JSON.stringify({
                error: {
                  code: 'internal',
                  message: 'No se pudo cargar la actividad de contribuciones.',
                },
              })
            )

            console.error(
              '[github-contributions/dev]',
              error instanceof Error ? error.message : 'Error desconocido'
            )
          }
        )
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler']],
      },
    }),
    githubContributionsDevServer(),
  ],
})
