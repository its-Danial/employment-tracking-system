import { getDirname } from '@adonisjs/core/helpers'
import inertia from '@adonisjs/inertia/client'
import adonisjs from '@adonisjs/vite/client'
import { PrimeVueResolver } from '@primevue/auto-import-resolver'
import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'
import tailwindcss from 'tailwindcss'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },

  plugins: [
    inertia({
      ssr: { enabled: true, entrypoint: 'resources/inertia/app/ssr.ts' },
    }),
    vue(),
    adonisjs({
      entrypoints: ['resources/inertia/app/app.ts'],
      reload: ['resources/views/**/*.edge'],
    }),
    Components({
      dts: 'resources/inertia/components.d.ts',
      resolvers: [PrimeVueResolver()],
    }),
  ],

  /**
   * Define aliases for importing modules from
   * your frontend code
   */
  resolve: {
    alias: {
      '~/': `${getDirname(import.meta.url)}/resources/inertia/`,
    },
  },
})
