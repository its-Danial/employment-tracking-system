import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { UserFactory } from '#database/factories/user_factory'
import Tenant from '#models/tenant'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    await Tenant.createMany([
      { id: 1, name: 'tenant one', title: 'The Tenant One', subdomain: 'localhost' },
      { id: 2, name: 'tenant two', title: 'The Tenant Two', subdomain: 'development' },
    ])

    await UserFactory.createMany(5)
  }
}
