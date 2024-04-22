import CartService from '#services/cart_service'
import { cartValidator } from '#validators/cart'
import type { HttpContext } from '@adonisjs/core/http'
import { mapApiResponseToUserCarts } from '../resource/cart.js'

export default class CartsController {
  async index({ auth }: HttpContext) {
    const carts = await auth
      .user!.related('carts')
      .query()
      .preload('products', (productQuery) => productQuery.preload('product'))

    return mapApiResponseToUserCarts(carts)
  }

  async store({ request, auth, response }: HttpContext) {
    const payload = await request.validateUsing(cartValidator)

    const totalPrice = await CartService.getTotalPriceProducts(payload.products)
    const totalProducts = await CartService.getTotalProducts(payload.products)

    if (totalPrice !== payload.total) {
      return response.badRequest({
        errors: 'Invalid total field !',
      })
    }

    const { id } = await auth.user!.related('carts').create({
      ...payload,
      total: totalPrice,
      totalQuantity: payload.products.length,
      totalProducts,
    })

    await CartService.addProductsInCart(payload.products, id)

    return response.ok({ message: 'Cart created !' })
  }
}
