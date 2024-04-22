import factory from '@adonisjs/lucid/factories'
import Product from '#models/product'

export const ProductFactory = factory
  .define(Product, async ({ faker }) => {
    return {
      brand: faker.lorem.word(),
      category_id: 2,
      description: faker.lorem.sentences(),
      price: 4500,
      stock: 23,
      title: faker.lorem.word(),
      rating: 34,
      thumbnail: faker.image.url(),
      discount_percentage: 123.4,
    }
  })
  .build()
