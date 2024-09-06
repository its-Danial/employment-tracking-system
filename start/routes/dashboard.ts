/*
|--------------------------------------------------------------------------
| Dashboard routes file
|--------------------------------------------------------------------------
*/
import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const DashboardController = () => import('#controllers/dashboard_controller')

router.get('/', [DashboardController, 'index']).as('dashboard.index').use(middleware.auth())
