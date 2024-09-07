import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { CandidateFactory } from '#database/factories/candidate_factory'
import { SkillFactory } from '#database/factories/skill_factory'
import { TenantFactory } from '#database/factories/tenant_factory'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    const tenants = await TenantFactory.with('branding').createMany(2)

    const users = await UserFactory.createMany(5)

    const skills = await SkillFactory.merge({ tenantId: tenants[0].id }).createMany(5)

    // Create candidates and dynamically assign 'createdBy' and 'tenantId' fields
    const tenantCandidates = await Promise.all(
      users.map(async (user) => {
        return CandidateFactory.merge({ createdBy: user.id, tenantId: tenants[0].id }).createMany(
          10
        ) // 10 candidate per user
      })
    )

    // Attach skills to candidates
    await Promise.all(
      tenantCandidates.map(async (candidates) => {
        const skillIds = this.#getRandom(skills, 3).map((skill) => skill.id)
        await Promise.all(
          candidates.map(async (candidate) => {
            // Attach skills to the candidate
            await candidate.related('skills').attach(
              skillIds.reduce<Record<number, {}>>((obj, skillId) => {
                obj[skillId] = {}
                return obj
              }, {})
            )
          })
        )
      })
    )
  }

  #getRandom<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
}
