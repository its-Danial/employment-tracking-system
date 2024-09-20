import db from '@adonisjs/lucid/services/db'
import vine, { VineNumber, VineString } from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
  tenantId: number
}

async function doesExist(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  const query = db.from(options.table).select(options.column).where(options.column, value)

  if (options.tenantId) {
    query.andWhere('tenant_id', options.tenantId)
  }

  const result = await query.first()

  if (!result) {
    // Report that the value does not exist within the tenant
    field.report('Value for {{ field }} does not exist', 'doesExist', field)
  }
}

export const doesExistRule = vine.createRule(doesExist)

declare module '@vinejs/vine' {
  interface VineNumber {
    doesExist(options: Options): this
  }
  interface VineString {
    doesExist(options: Options): this
  }
}

VineNumber.macro('doesExist', function (this: VineNumber, options: Options) {
  return this.use(doesExistRule(options))
})

VineString.macro('doesExist', function (this: VineString, options: Options) {
  return this.use(doesExistRule(options))
})
