import Product from '#models/product'
import ProductCart from '#models/product_cart'

export default class CartService {
  static async getTotalPriceProducts(productIds: number[]) {
    const products = await this.checkIfProductsExist(productIds)

    const totalPrice = products.reduce((acc, product) => acc + product.price, 0)

    return totalPrice
  }

  static async getTotalProducts(productIds: number[]) {
    let uniqueProductIds: number[] = []
    productIds.forEach((id) => {
      if (!uniqueProductIds.includes(id)) uniqueProductIds.push(id)
    })

    return uniqueProductIds.length
  }

  static async checkIfProductsExist(productIds: number[]) {
    const products: Product[] = []

    for (let id of productIds) {
      products.push(await Product.findOrFail(id))
    }

    return products
  }

  static async addProductsInCart(productIds: number[], cartId: number) {
    const products: Product[] = []

    for (let id of productIds) {
      await ProductCart.create({ cartId, productId: id })
    }

    return products
  }
}
