/*
|--------------------------------------------------------------------------
| Candidates routes file
|--------------------------------------------------------------------------
*/
import router from '@adonisjs/core/services/router'

import { middleware } from '#start/kernel'

const CandidatesController = () => import('#controllers/candidates_controller')

router.resource('candidates', CandidatesController).use('*', middleware.auth())
