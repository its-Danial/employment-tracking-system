import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidates'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tenant_id').unsigned().references('tenants.id').notNullable()
      table.integer('created_by').unsigned().references('users.id').notNullable()

      table.string('first_name').notNullable()
      table.string('last_name').notNullable()
      table.string('email').nullable()
      table.string('phone_number')
      table.string('passport_number')

      table.text('experience').nullable()
      table.string('current_occupation').nullable()
      table.string('previous_occupation').nullable()
      table.text('education').nullable()
      table.string('desired_occupation').nullable()

      // unique constraint
      table.unique(['tenant_id', 'phone_number', 'passport_number'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
