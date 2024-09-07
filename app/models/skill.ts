import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

import Candidate from './candidate.js'
import Tenant from './tenant.js'

export default class Skill extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tenantId: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @manyToMany(() => Candidate, {
    pivotTable: 'candidate_skills',
    pivotTimestamps: true,
  })
  declare candidates: ManyToMany<typeof Candidate>
}
