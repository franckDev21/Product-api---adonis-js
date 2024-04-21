import vine from '@vinejs/vine'

export const categoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2),
    image: vine.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
)
