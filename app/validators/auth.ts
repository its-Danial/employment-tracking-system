// app/Validators/AuthValidator.ts
import vine from '@vinejs/vine'

import { emailRule, nameRule } from './common.js'

export const passwordRule = vine.string().minLength(8)

export const registerValidator = (tenantId: number) =>
  vine.compile(
    vine.object({
      firstName: nameRule,
      lastName: nameRule,
      email: emailRule.isUnique({
        table: 'users',
        column: 'email',
        tenantId,
      }),
      password: passwordRule,
    })
  )

export const loginValidator = vine.compile(
  vine.object({
    email: emailRule,
    password: passwordRule,
    rememberMe: vine.boolean().optional(),
  })
)
