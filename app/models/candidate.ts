import { BaseModel, belongsTo, column, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, ManyToMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'

import Skill from './skill.js'
import Tenant from './tenant.js'
import User from './user.js'

export default class Candidate extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tenantId: number

  @column()
  declare createdBy: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string | null

  @column()
  declare phoneNumber: string

  @column()
  declare passportNumber: string
  @column({ serializeAs: null })
  declare experience: string | null

  @column()
  declare currentOccupation: string | null

  @column()
  declare previousOccupation: string | null

  @column({ serializeAs: null })
  declare education: string | null

  @column()
  declare desiredOccupation: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Tenant)
  declare tenant: BelongsTo<typeof Tenant>

  @belongsTo(() => User, { foreignKey: 'createdBy' })
  declare createdByUser: BelongsTo<typeof User>

  @manyToMany(() => Skill, {
    pivotTable: 'candidate_skills',
    pivotTimestamps: true,
  })
  declare skills: ManyToMany<typeof Skill>

  // @beforeSave()
  // static async hashPassportNumber(candidate: Candidate) {
  //   if (candidate.$dirty.passportNumber && candidate.passportNumber) {
  //     candidate.passportNumber = await hash.use('scrypt').make(candidate.passportNumber)
  //   }
  // }

  serialize() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      phoneNumber: this.phoneNumber,
      passportNumber: this.passportNumber,
      experience: this.experience,
      currentOccupation: this.currentOccupation,
      previousOccupation: this.previousOccupation,
      education: this.education,
      desiredOccupation: this.desiredOccupation,
      createdAt: this.createdAt.toISO(),
      updatedAt: this.updatedAt.toISO(),
      skills: this.skills.map((skill) => ({
        id: skill.id,
        name: skill.name,
      })),
      createdByUser: {
        id: this.createdByUser.id,
        name: this.createdByUser.firstName + ' ' + this.createdByUser.lastName,
      },
    }
  }
}
