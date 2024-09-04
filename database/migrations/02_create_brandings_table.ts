import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'brandings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('tenant_id').unsigned().references('tenants.id').onDelete('CASCADE')
      table.string('primary_color').notNullable()
      table.string('secondary_color').notNullable()
      table.string('logo').nullable()
      table.string('tagline').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
