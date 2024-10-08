import { createInertiaApp } from '@inertiajs/vue3'
import { renderToString } from '@vue/server-renderer'

import { type DefineComponent, createSSRApp, h } from 'vue'

import AppLayout from '~/layouts/app_layout.vue'

export default function render(page: any) {
  return createInertiaApp({
    page,
    render: renderToString,
    resolve: (name) => {
      const pages = import.meta.glob<DefineComponent>('../pages/**/*.vue', {
        eager: true,
      })
      const page = pages[`../pages/${name}.vue`]

      page.default.layout = page.default.layout || AppLayout
      return page
    },

    setup({ App, props, plugin }) {
      return createSSRApp({ render: () => h(App, props) }).use(plugin)
    },
  })
}
