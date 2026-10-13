import { globSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

// Every page is an entry point. Keys keep the folder so a case and a note can share a slug.
const pages = globSync(['index.html', 'cases/*.html', 'notes/*.html'], {
  cwd: __dirname,
  exclude: ['cases/template.html'],
})

export default defineConfig({
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        pages.map((path) => [path.replace(/\.html$/, ''), resolve(__dirname, path)]),
      ),
    },
  },
})
