import factory from '@adonisjs/lucid/factories'

import Skill from '#models/skill'

export const SkillFactory = factory
  .define(Skill, async ({ faker }) => {
    return {
      tenantId: 1,
      name: faker.company.buzzVerb(),
    }
  })
  .build()
