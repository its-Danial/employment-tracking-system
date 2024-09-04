import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'
import { loginValidator } from '#validators/auth'

export default class LoginController {
  async index({ inertia }: HttpContext) {
    return inertia.render('auth/login')
  }
  async store({ request, response, auth, tenant, session }: HttpContext) {
    const { email, password, rememberMe } = await request.validateUsing(loginValidator)

    const user = await User.verifyCredentials(email, password, tenant.id)

    await auth.use('web').login(user, rememberMe)

    return response.redirect().toRoute('home.index')
  }
}
