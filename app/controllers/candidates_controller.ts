import type { HttpContext } from '@adonisjs/core/http'
import redis from '@adonisjs/redis/services/main'

import type { DataIteratorFilter } from '#lib/types/filter'
import { PaginatedResult } from '#lib/types/pagination'
import Candidate from '#models/candidate'
import Skill from '#models/skill'

export type CandidatesControllerIndexProps = {
  paginatedCandidates: PaginatedResult<ReturnType<Candidate['serialize']>>
  filters: DataIteratorFilter[]
  skills: { label: string; value: string }[]
}

export default class CandidatesController {
  /**
   * Display a list of candidates
   */
  async index({ inertia, tenant, request, logger }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const searchQuery = request.input('search', '').trim().toLowerCase()
    const skillIds: number[] | undefined = request
      .input('skills')
      ?.split(',')
      .map((id: string) => Number(id))

    const cacheKey = tenant.subdomain + request.url(true).replace('/', ':')
    const cachedData = await redis.get(cacheKey)

    if (cachedData) {
      logger.info('Using cached data for candidates index', { cacheKey })
      const responseData: CandidatesControllerIndexProps = JSON.parse(cachedData)
      return inertia.render('candidates', responseData)
    }

    // Start building the query
    const candidatesQuery = Candidate.query()
      .where({ tenantId: tenant.id })
      .preload('skills')
      .preload('createdByUser')
      .orderBy('first_name', 'asc')

    // Apply search query if present
    if (searchQuery) {
      candidatesQuery.where((query) => {
        query
          .whereILike('first_name', `%${searchQuery}%`)
          .orWhereILike('last_name', `%${searchQuery}%`)
          .orWhereILike('passport_number', `%${searchQuery}%`)
          .orWhereILike('phone_number', `%${searchQuery}%`)
      })
    }

    // Filter by skills if present
    if (skillIds && skillIds.length) {
      candidatesQuery.whereHas(
        'skills',
        (query) => {
          query.whereIn('skills.id', skillIds)
        },
        '=',
        skillIds.length
      )
    }

    const candidates = await candidatesQuery.paginate(page, limit)

    const serializedPaginatedCandidates: PaginatedResult<ReturnType<Candidate['serialize']>> = {
      data: candidates.all().map((candidate) => candidate.serialize()),
      meta: { ...candidates.getMeta(), qs: request.qs() },
    }

    const skillOptionsCacheKey = tenant.subdomain + ':skills:select:label&value:orderBy:asc'
    const cachedSkillsOptions = await redis.get(skillOptionsCacheKey)
    let skillsOptions: { label: string; value: string }[]

    if (cachedSkillsOptions) {
      logger.info('Using cached skills for candidates index', { cacheKey: skillOptionsCacheKey })
      skillsOptions = JSON.parse(cachedSkillsOptions)
    } else {
      const queriedSkills = await Skill.query()
        .where({ tenantId: tenant.id })
        .select('id', 'name')
        .orderBy('name', 'asc')
      skillsOptions = queriedSkills.map((skill) => ({ label: skill.name, value: String(skill.id) }))
      redis.set(skillOptionsCacheKey, JSON.stringify(skillsOptions), 'EX', 3600)
    }
    const filters: DataIteratorFilter[] = [
      {
        label: 'Skills',
        queryKey: 'skills',
        options: skillsOptions,
      },
    ]

    const responseData: CandidatesControllerIndexProps = {
      paginatedCandidates: serializedPaginatedCandidates,
      filters,
      skills: skillsOptions,
    }

    await redis.set(cacheKey, JSON.stringify(responseData), 'EX', 3600)

    return inertia.render('candidates', responseData)
  }

  // /**
  //  * Display form to create a new candidate
  //  */
  // async create({ response }: HttpContext) {
  //   return response.redirect().toRoute('candidates.index', { edit: true })
  // }

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
