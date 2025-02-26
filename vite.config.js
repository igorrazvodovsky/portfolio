import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        convertiq: resolve(__dirname, 'cases/convertiq.html'),
        formbuilder: resolve(__dirname, 'cases/formbuilder.html'),
        lighting: resolve(__dirname, 'cases/lighting.html'),
      },
    },
  },
})