import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { TenantFactory } from '#database/factories/tenant_factory'
import { UserFactory } from '#database/factories/user_factory'

export default class extends BaseSeeder {
  static environment = ['development']

  async run() {
    await TenantFactory.with('branding').createMany(2)
    await UserFactory.createMany(5)
  }
}
