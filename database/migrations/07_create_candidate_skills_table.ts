import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'candidate_skills'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table
        .integer('candidate_id')
        .unsigned()
        .references('candidates.id')
        .notNullable()
        .onDelete('CASCADE')

      table.integer('skill_id').unsigned().references('skills.id').notNullable().onDelete('CASCADE')

      // unique constraint
      table.unique(['candidate_id', 'skill_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
