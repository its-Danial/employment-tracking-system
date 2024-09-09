import type { HttpContext } from '@adonisjs/core/http'

import type { DataIteratorFilter } from '#lib/types/filter'
import { PaginatedResult } from '#lib/types/pagination'
import Candidate from '#models/candidate'
import Skill from '#models/skill'

export default class CandidatesController {
  /**
   * Display a list of candidates
   */
  async index({ inertia, tenant, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20

    const searchQuery = request.input('search', '').trim().toLowerCase()

    const candidatesQuery = Candidate.query()
      .where({ tenantId: tenant.id })
      .preload('skills')
      .preload('createdByUser')
      .orderBy('first_name', 'asc') // TODO: make this configurable

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

    const skills = await Skill.query()
      .where({ tenantId: tenant.id })
      .select('id', 'name')
      .orderBy('name', 'asc')

    const filters: DataIteratorFilter[] = [
      {
        label: 'Skills',
        queryKey: 'skills',
        options: skills.map((skill) => ({ label: skill.name, value: String(skill.id) })),
      },
    ]

    return inertia.render('candidates', {
      paginatedCandidates: serializedPaginatedCandidates,
      filters,
    })
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
