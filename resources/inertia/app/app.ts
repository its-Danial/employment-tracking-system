/// <reference path="../../../adonisrc.ts" />
/// <reference path="../../../config/inertia.ts" />
import { resolvePageComponent } from '@adonisjs/inertia/helpers'

import { createInertiaApp } from '@inertiajs/vue3'

import { type DefineComponent, createSSRApp, h } from 'vue'

import '~/css/app.css'
import AppLayout from '~/layouts/app_layout.vue'

const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS'

createInertiaApp({
  progress: { color: 'hsl(var(--primary))' },

  title: (title) => `${title} - ${appName}`,

  resolve: async (name) => {
    const page = await resolvePageComponent(
      `../pages/${name}.vue`,
      import.meta.glob<DefineComponent>('../pages/**/*.vue')
    )

    page.default.layout = page.default.layout || AppLayout
    return page
  },

  setup({ el, App, props, plugin }) {
    createSSRApp({ render: () => h(App, props) })
      .use(plugin)
      .mount(el)
  },
})
