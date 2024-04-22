import vine from '@vinejs/vine'

export const cartValidator = vine.compile(
  vine.object({
    total: vine.number(),
    discounted_total: vine.number(),
    products: vine.array(vine.number()).compact(),
  })
)
