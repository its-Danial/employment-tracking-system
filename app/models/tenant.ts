import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

import Branding from './branding.js'
import User from './user.js'

export default class Tenant extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare title: string

  @column()
  declare subdomain: string

  @column()
  declare companyWebsite: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Branding)
  declare branding: HasOne<typeof Branding>

  @hasMany(() => User)
  declare users: HasMany<typeof User>
}
