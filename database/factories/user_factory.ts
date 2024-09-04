import factory from '@adonisjs/lucid/factories'

import Roles from '#enums/roles'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      tenantId: 1,
      roleId: Roles.USER,
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      image: faker.image.avatar(),
      email: faker.internet.email().toLowerCase(),
      password: 'password',
    }
  })
  .build()
