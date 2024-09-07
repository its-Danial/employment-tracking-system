import type { HttpContext } from '@adonisjs/core/http'

import { PaginatedResult } from '#lib/types/pagination'
import Candidate from '#models/candidate'

export default class CandidatesController {
  /**
   * Display a list of candidates
   */
  async index({ inertia, tenant, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const searchQuery = request.input('q', '').trim().toLowerCase()

    const candidatesQuery = Candidate.query()
      .where({ tenantId: tenant.id })
      .preload('skills')
      .preload('createdByUser')

    if (searchQuery) {
      candidatesQuery.where((query) => {
        query
          .whereILike('first_name', `%${searchQuery}%`)
          .orWhereILike('last_name', `%${searchQuery}%`)
          .orWhereILike('passport_number', `%${searchQuery}%`)
          .orWhereILike('phone_number', `%${searchQuery}%`)
      })
    }

    const candidates = await candidatesQuery.paginate(page, limit)

    const serializedPaginatedCandidates: PaginatedResult<ReturnType<Candidate['serialize']>> = {
      data: candidates.all().map((candidate) => candidate.serialize()),
      meta: { ...candidates.getMeta(), qs: request.qs() },
    }

    return inertia.render('candidates', { paginatedCandidates: serializedPaginatedCandidates })
  }

  // /**
  //  * Display form to create a new candidate
  //  */
  // async create({}: HttpContext) {}

  // /**
  //  * Handle form submission for the create action
  //  */
  // async store({ request }: HttpContext) {}

  // /**
  //  * Show individual candidate
  //  */
  // async show({ params }: HttpContext) {}

  // /**
  //  * Edit individual candidate
  //  */
  // async edit({ params }: HttpContext) {}

  // /**
  //  * Handle form submission for the edit action
  //  */
  // async update({ params, request }: HttpContext) {}

  // /**
  //  * Delete candidate
  //  */
  // async destroy({ params }: HttpContext) {}
}
