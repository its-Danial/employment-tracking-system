import { Request } from '@adonisjs/core/http'

import Tenant from '#models/tenant'

declare module '@adonisjs/core/http' {
  interface Request {
    tenant(): Promise<Tenant>
  }
}

Request.macro('tenant', async function (this: Request): Promise<Tenant> {
  const subdomain = this.hostname()?.split('.')[0]

  if (!subdomain) {
    throw new Error('no subdomain found')
  }

  const tenant = await Tenant.findByOrFail('subdomain', subdomain)

  return tenant
})
