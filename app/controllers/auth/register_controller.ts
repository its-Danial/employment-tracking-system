import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { registerValidator } from '#validators/auth'

export default class RegistersController {
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/register')
  }

  async store({ request, response, auth, tenant }: HttpContext) {
    const data = await request.validateUsing(registerValidator(tenant.id))

    const user = await User.create({
      ...data,
      tenantId: tenant.id,
    })

    await auth.use('web').login(user)

    response.redirect().toRoute('home.index')
  }
}
