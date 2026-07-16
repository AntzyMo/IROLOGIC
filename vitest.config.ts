import { fileURLToPath } from 'node:url'
import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    environment: 'nuxt',
    globals: true,
    environmentOptions: {
      nuxt: { rootDir: fileURLToPath(new URL('./', import.meta.url)), domEnvironment: 'happy-dom' }
    }
  }
})
