import Product from '#models/product'
import env from '#start/env'
import { updateProductImageValidator } from '#validators/file'
import { createProductValidator } from '#validators/product'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import db from '@adonisjs/lucid/services/db'

@inject()
export default class ProductsController {
  async index(ctx: HttpContext) {
    return this.getProductListWithPagination(ctx)
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

  async search(ctx: HttpContext) {
    const query = ctx.request.input('q')
    const page = ctx.request.input('page')

    if (!query) return this.getProductListWithPagination(ctx)

    return db.from('products').whereILike('title', `%${query}%`).paginate(page, 10)
  }

  private async getProductListWithPagination({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 10

    const products = await Product.query()
      .preload('user', (userQuery) => {
        userQuery.select('fullName')
      })
      .preload('images', (imageQuery) => {
        imageQuery.select('url')
      })
      .paginate(page, limit)

    return products
  }
}
