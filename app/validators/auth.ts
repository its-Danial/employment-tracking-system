// app/Validators/AuthValidator.ts
import vine from '@vinejs/vine'

export const nameRule = vine.string().minLength(2).maxLength(100).optional()
export const emailRule = vine.string().email()
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
