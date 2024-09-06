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
    user: (ctx) =>
      ctx.auth.user?.serialize({
        fields: {
          omit: ['tenantId', 'createdAt', 'updatedAt'],
        },
      }),
    errors: (ctx) => {
      const errors = ctx.session?.flashMessages.get('errors') ?? {}
      return Object.keys(errors).reduce(
        (obj, key) => ({
          ...obj,
          [key]: errors[key].join(', '),
        }),
        {}
      )
    },
    exceptions: (ctx) => ctx.session.flashMessages.get('errorsBag'),
    notification: (ctx) => ctx.session.flashMessages.get('notification'),
    tenant: (ctx) =>
      ctx.tenant.serialize({
        fields: { pick: ['id', 'name', 'title'] },
        relations: { branding: { fields: { omit: ['tenantId', 'createdAt', 'updatedAt'] } } },
      }),
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
  export interface SharedProps extends InferSharedProps<typeof inertiaConfig> {
    user: {
      id: string
      roleId: string
      firstName: string
      lastName: string
      image: string
      email: string
    }
    errors: Record<string, string>
    exceptions: Record<string, string>
    notification: Record<string, string>
    tenant: {
      id: string
      name: string
      title: string
      branding: {
        id: number
        logo: string
        primaryColor: string
        secondaryColor: string
        tagline: string
      }
    }
    [key: string]: any
  }
}
