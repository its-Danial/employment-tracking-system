import factory from '@adonisjs/lucid/factories'

import Candidate from '#models/candidate'

import { SkillFactory } from './skill_factory.js'

export const CandidateFactory = factory
  .define(Candidate, async ({ faker }) => {
    return {
      tenantId: 1,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      email: faker.internet.email(),
      phoneNumber: faker.phone.number(),
      passportNumber: faker.phone.number(),
      experience: faker.lorem.sentence(),
      currentOccupation: faker.lorem.sentence(),
      previousOccupation: faker.lorem.sentence(),
      education: faker.lorem.sentence(),
      desiredOccupation: faker.lorem.sentence(),
    }
  })
  .relation('skills', SkillFactory) // No need to specify tenantId or name here
  .build()
