import Product from '#models/product'
import env from '#start/env'
import { updateProductImageValidator } from '#validators/file'
import { createProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

@inject()
export default class ProductsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const products = Product.query()
      .preload('user', (userQuery) => {
        userQuery.select('fullName')
      })
      .preload('images', (imageQuery) => {
        imageQuery.select('url')
      })
      .paginate(page, limit)

    return products
  }

  async store({ auth, request, response }: HttpContext) {
    const data = request.all()
    const payload = await createProductValidator.validate(data)

    const { thumbnail } = await request.validateUsing(updateProductImageValidator)

    const product = await auth.user!.related('products').create(payload)

    await thumbnail.move(app.makePath('uploads/products'))

    product.thumbnail = `${env.get('APP_URL')}/uploads/products/${thumbnail.fileName}`
    await product.save()

    return response.status(201).json({ message: 'Product created !' })
  }

  async update({}: HttpContext) {}
}
