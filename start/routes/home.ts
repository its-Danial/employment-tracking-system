/*
|--------------------------------------------------------------------------
| Home/Dashboard routes file
|--------------------------------------------------------------------------
*/
import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const HomeController = () => import('#controllers/home_controller')

router.get('/', [HomeController, 'index']).as('home.index').use(middleware.auth())
