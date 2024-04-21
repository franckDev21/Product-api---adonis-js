// import type { HttpContext } from '@adonisjs/core/http'
import Category from '#models/category'
import FileService from '#services/file_service'
import { categoryValidator } from '#validators/category'
import { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class CategoriesController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = request.input('limit', 5)

    const categories = await db.from('categories').paginate(page, limit)
    return categories
  }

  async store({ request, response, params }: HttpContext) {
    await this.handleRequest(request, params)
    return response.ok({ message: 'Category Created !' })
  }

  async handleRequest(request: HttpContext['request'], params: HttpContext['params']) {
    const category = params.id ? await Category.findOrFail(params.id) : new Category()

    const { name, image } = await request.validateUsing(categoryValidator)
    const path = await FileService.upload(image, 'category')

    category.merge({ name, image: path }).save()
  }

  async update({ request, response, params }: HttpContext) {
    await this.handleRequest(request, params)
    return response.ok({ message: 'Category Updated !' })
  }
}
