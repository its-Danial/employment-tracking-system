import { BaseSeeder } from '@adonisjs/lucid/seeders'

import Roles from '#enums/roles'
import Role from '#models/role'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method

    await Role.createMany([
      {
        id: Roles.USER,
        name: 'User',
      },
      {
        id: Roles.ADMIN,
        name: 'Admin',
      },
    ])
  }
}
