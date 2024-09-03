// isUnique macro with tenant-aware logic
import db from '@adonisjs/lucid/services/db'

import vine, { VineNumber, VineString } from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

type Options = {
  table: string
  column: string
  tenantId?: number // Optional tenant ID
}

async function isUnique(value: unknown, options: Options, field: FieldContext) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    return
  }

  // Create a query to check for uniqueness
  const query = db.from(options.table).select(options.column).where(options.column, value)

  // Add tenant condition if tenant information is provided
  if (options.tenantId) {
    query.andWhere('tenant_id', options.tenantId)
  }

  const result = await query.first()

  if (result) {
    // Report that the value is NOT unique within the tenant
    field.report('This {{ field }} is already taken', 'isUnique', field)
  }
}

export const isUniqueRule = vine.createRule(isUnique)

declare module '@vinejs/vine' {
  interface VineString {
    isUnique(options: Options): this
  }

  interface VineNumber {
    isUnique(options: Options): this
  }
}

VineString.macro('isUnique', function (this: VineString, options: Options) {
  return this.use(isUniqueRule(options))
})

VineNumber.macro('isUnique', function (this: VineNumber, options: Options) {
  return this.use(isUniqueRule(options))
})
