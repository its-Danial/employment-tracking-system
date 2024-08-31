/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/
import router from '@adonisjs/core/services/router'

import { middleware } from './kernel.js'

const HomeController = () => import('#controllers/home_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const RegistersController = () => import('#controllers/auth/register_controller')
const ForgotPasswordsController = () => import('#controllers/auth/forgot_password_controller')

router.get('/', [HomeController, 'index'])

router
  .group(() => {
    router.get('login', [LoginController, 'index']).as('login')
    router.get('register', [RegistersController, 'index']).as('register')
    router.get('forgot-password', [ForgotPasswordsController, 'index']).as('forgot-password')
  })
  .as('auth')
  .use(middleware.guest())
