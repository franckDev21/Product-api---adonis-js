import Product from '#models/product'
import FileService from '#services/file_service'
import { createImagesValidator, updateProductImageValidator } from '#validators/file'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ProductsController {
  async index(ctx: HttpContext) {
    return this.getProductListWithPagination(ctx)
  }

  async store({ auth, request, response, params }: HttpContext) {
    await this.handleRequest(auth, params, request)
    return response.status(201).json({ message: 'Product created !' })
  }

  async update({ auth, params, request, response }: HttpContext) {
    await this.handleRequest(auth, params, request)
    return response.ok({ message: 'Product updated !' })
  }

  async search(ctx: HttpContext) {
    const query = ctx.request.input('q')
    const page = ctx.request.input('page')

    if (!query) return this.getProductListWithPagination(ctx)

    return db.from('products').whereILike('title', `%${query}%`).paginate(page, 10)
  }

  async handleRequest(
    auth: HttpContext['auth'],
    params: HttpContext['params'],
    request: HttpContext['request']
  ) {
    const product = params.id
      ? await Product.query()
          .where('id', params.id)
          .preload('user', (userQuery) => {
            userQuery.select('fullName')
          })
          .preload('images', (imageQuery) => {
            imageQuery.select('url')
          })
          .firstOrFail()
      : new Product()

    const payload = await request.validateUsing(createProductValidator)
    const { thumbnail } = await request.validateUsing(updateProductImageValidator)
    const { images } = await request.validateUsing(createImagesValidator)

    product.thumbnail = await FileService.upload(thumbnail, 'products')

    product.merge({ ...payload, userId: auth.user!.id }).save()

    // Save product images in database
    const imgs = await FileService.uploadMultiple(images, 'products')
    for (let url of imgs) {
      await product.related('images').create({ url })
    }
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
