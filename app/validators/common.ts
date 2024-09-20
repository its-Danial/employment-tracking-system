import vine from '@vinejs/vine'

export const nameRule = vine.string().minLength(2).maxLength(100)
export const emailRule = vine.string().email()
