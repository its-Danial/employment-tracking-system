import { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class TenantMiddleware {
  async handle({ request }: HttpContext, next: NextFn) {
    await request.tenant()

    const output = await next()
    return output
  }
}
