import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2),
    description: vine.string().minLength(8),
    price: vine.number(),
    discount_percentage: vine.number(),
    rating: vine.number(),
    stock: vine.number(),
    brand: vine.string(),
    category_id: vine.number(),
  })
)
