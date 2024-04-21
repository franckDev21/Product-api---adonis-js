/* eslint-disable @adonisjs/prefer-lazy-controller-import */
import AuthController from '#controllers/auth_controller'
import ProductsController from '#controllers/products_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { HttpContext } from '@adonisjs/core/http'
import { sep, normalize } from 'node:path'
import app from '@adonisjs/core/services/app'
import CategoriesController from '#controllers/categories_controller'

const PATH_TRAVERSAL_REGEX = /(?:^|[\\/])\.\.(?:[\\/]|$)/

router.get('/uploads/*', ({ request, response }) => {
  const filePath = request.param('*').join(sep)
  const normalizedPath = normalize(filePath)

  if (PATH_TRAVERSAL_REGEX.test(normalizedPath)) {
    return response.badRequest('Malformed path')
  }

  const absolutePath = app.makePath('uploads', normalizedPath)
  return response.download(absolutePath)
})

router
  .group(() => {
    // AUTH
    router.post('auth/login', [AuthController, 'login'])
    router.post('auth/register', [AuthController, 'register'])
    router.delete('auth/logout', [AuthController, 'logout']).use(middleware.auth())

    // PROFIL
    router.get('user-info', async ({ auth }: HttpContext) => auth.user).use(middleware.auth())

    // PRODUCT
    router
      .group(() => {
        router.get('/', [ProductsController, 'index'])
        router.post('/', [ProductsController, 'store'])
        router.patch('/:id', [ProductsController, 'update'])
        router.get('/search', [ProductsController, 'search'])
      })
      .prefix('products')
      .use(middleware.auth())

    // CATEGORY
    router
      .group(() => {
        router.get('/', [CategoriesController, 'index'])
        router.post('/', [CategoriesController, 'store'])
        router.patch('/:id', [CategoriesController, 'update'])
      })
      .prefix('categories')
      .use(middleware.auth())
  })
  .prefix('api/v1')
