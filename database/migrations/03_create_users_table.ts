import { BaseSchema } from '@adonisjs/lucid/schema'

import Roles from '#enums/roles'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.integer('role_id').unsigned().references('roles.id').notNullable().defaultTo(Roles.USER)
      table.integer('tenant_id').unsigned().references('tenants.id').notNullable()

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('image').nullable()
      table.string('email', 254).notNullable()
      table.string('password').notNullable()

      // unique constraint for tenant_id and email
      table.unique(['tenant_id', 'email'])

      table.timestamp('created_at', { useTz: true }).notNullable()
      table.timestamp('updated_at', { useTz: true }).nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
