import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { CandidateFactory } from '#database/factories/candidate_factory'
import { SkillFactory } from '#database/factories/skill_factory'
import { TenantFactory } from '#database/factories/tenant_factory'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    // Create tenants
    const tenants = await TenantFactory.with('branding').createMany(2)

    // Create users
    const users = await UserFactory.createMany(5)

    // Create skills and assign tenant IDs
    const skills = await SkillFactory.merge({ tenantId: tenants[0].id }).createMany(5)

    // Create candidates and dynamically assign 'createdBy' and 'tenantId' fields
    const tenantCandidates = await Promise.all(
      users.map(async (user) => {
        return CandidateFactory.merge({ createdBy: user.id, tenantId: tenants[0].id }).createMany(
          10
        ) // Create 10 candidate per user
      })
    )

    // Attach skills to candidates without handling tenant_id and name in the pivot table
    await Promise.all(
      tenantCandidates.map(async (candidates) => {
        // Get a random set of skills
        const skillIds = this.#getRandom(skills, 3).map((skill) => skill.id)
        await Promise.all(
          candidates.map(async (candidate) => {
            // Attach skills to the candidate
            await candidate.related('skills').attach(
              skillIds.reduce<Record<number, {}>>((obj, skillId) => {
                obj[skillId] = {} // No additional fields needed
                return obj
              }, {})
            )
          })
        )
      })
    )
  }

  // Utility function to get random elements from an array
  #getRandom<T>(array: T[], count: number): T[] {
    const shuffled = array.sort(() => 0.5 - Math.random())
    return shuffled.slice(0, count)
  }
}
