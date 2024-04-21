import Product from '#models/product'
import FileUploaderService from '#services/upload_service'
import { createImagesValidator, updateProductImageValidator } from '#validators/file'
import { createProductValidator } from '#validators/product'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class ProductsController {
  async index(ctx: HttpContext) {
    return this.getProductListWithPagination(ctx)
  }

  async store({ auth, request, response }: HttpContext) {
    const data = request.all()
    const payload = await createProductValidator.validate(data)

    const { thumbnail } = await request.validateUsing(updateProductImageValidator)

    const { images } = await request.validateUsing(createImagesValidator)

    const product = await auth.user!.related('products').create(payload)

    product.thumbnail = await FileUploaderService.upload(thumbnail, 'products')
    await product.save()

    // Save product images in database
    const imgs = await FileUploaderService.uploadMultiple(images, 'products')
    for (let url of imgs) {
      await product.related('images').create({ url })
    }

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
