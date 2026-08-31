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
        'cascading-user-needs': resolve(__dirname, 'cases/cascading-user-needs.html'),
        'conversational-configuration': resolve(__dirname, 'cases/conversational-configuration.html'),
        'pattern-playground': resolve(__dirname, 'notes/pattern-playground.html'),
        'ai-native-design-practice': resolve(__dirname, 'notes/ai-native-design-practice.html'),
      },
    },
  },
})