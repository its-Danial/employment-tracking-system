import { defineConfig } from '@adonisjs/inertia'
import type { InferSharedProps } from '@adonisjs/inertia/types'

const inertiaConfig = defineConfig({
  /**
   * Path to the Edge view that will be used as the root view for Inertia responses
   */
  rootView: 'inertia_layout',

  /**
   * Data that should be shared with all rendered pages
   */
  sharedData: {
    user: (ctx) => ctx.auth.user?.serialize(),
    errors: (ctx) => {
      // Get all flash messages except 'notification'
      const allErrors = ctx.session?.flashMessages.all()
      const filteredErrors = Object.fromEntries(
        Object.entries(allErrors || {}).filter(([key]) => key !== 'notification')
      )
      return filteredErrors
    },
    notification: (ctx) => ctx.session.flashMessages.get('notification'),
    tenant: (ctx) =>
      ctx.tenant.serialize({ fields: ['id', 'name', 'title'] }) as {
        id: number
        name: string
        title: string
      },
  },

  /**
   * Options for the server-side rendering
   */
  ssr: {
    enabled: true,
    entrypoint: '/resources/inertia/app/ssr.ts',
  },
})

export default inertiaConfig

declare module '@adonisjs/inertia/types' {
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {}
}
