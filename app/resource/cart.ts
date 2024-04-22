import { Product, UserCart } from '../type/type.js'

export function mapApiResponseToUserCarts(apiResponse: any[]): UserCart[] {
  return apiResponse.map((cartData: any) => {
    const products: Product[] = cartData.products.map((cartProduct: any) => cartProduct.product)
    const userCart: UserCart = {
      id: cartData.id,
      total: cartData.total,
      discountedTotal: cartData.discountedTotal,
      userId: cartData.userId,
      totalProducts: cartData.totalProducts,
      totalQuantity: cartData.totalQuantity,
      createdAt: cartData.createdAt,
      updatedAt: cartData.updatedAt,
      products: products,
    }
    return userCart
  })
}
