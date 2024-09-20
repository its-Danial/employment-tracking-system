// app/Validators/CandidateValidator.ts
import vine from '@vinejs/vine'

import { emailRule, nameRule } from './common.js'

export const candidateValidator = (tenantId: number) =>
  vine.compile(
    vine.object({
      firstName: nameRule,
      lastName: nameRule,
      email: emailRule.optional(),
      phoneNumber: vine.string().mobile().isUnique({
        table: 'candidates',
        column: 'phone_number',
        tenantId,
      }),
      passportNumber: vine
        .string()
        .passport({ countryCode: ['PK'] })
        .isUnique({
          table: 'candidates',
          column: 'passport_number',
          tenantId,
        }),
      experience: vine.string().optional(),
      currentOccupation: vine.string().optional(),
      previousOccupation: vine.string().optional(),
      education: vine.string().optional(),
      desiredOccupation: vine.string().optional(),
      skills: vine
        .array(vine.string().doesExist({ table: 'skills', column: 'id', tenantId }))
        .optional(),
    })
  )
