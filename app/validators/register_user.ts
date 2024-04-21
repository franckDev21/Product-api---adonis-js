import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(6),
    email: vine
      .string()
      .email()
      .unique(async (db, value) => !(await db.from('users').where('email', value).first())),
    password: vine.string().minLength(8),
  })
)
