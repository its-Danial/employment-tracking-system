/*
|--------------------------------------------------------------------------
| Auth routes file
|--------------------------------------------------------------------------
*/
import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const LoginController = () => import('#controllers/auth/login_controller')
const RegistersController = () => import('#controllers/auth/register_controller')
const ForgotPasswordsController = () => import('#controllers/auth/forgot_password_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')

router
  .group(() => {
    router
      .group(() => {
        // LOGIN
        router.get('login', [LoginController, 'index']).as('login.index')
        router.post('login', [LoginController, 'store']).as('login.store')

        // REGISTER
        router.get('register', [RegistersController, 'index']).as('register.index')
        router.post('register', [RegistersController, 'store']).as('register.store')

        // FORGOT PASSWORD
        router
          .get('forgot-password', [ForgotPasswordsController, 'index'])
          .as('forgot-password.index')
      })
      .use(middleware.guest())

    // LOGOUT
    router.post('logout', [LogoutController]).as('logout').use(middleware.auth())
  })
  .as('auth')
