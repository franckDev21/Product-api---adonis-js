export interface Product {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  brand: string
  thumbnail: string
  userId: number
  categoryId: number
  createdAt: string
  updatedAt: string
}

export interface CartProduct {
  id: number
  productId: number
  cartId: number
  createdAt: string
  updatedAt: string
  product: Product
}

export interface UserCart {
  id: number
  total: number
  discountedTotal: number
  userId: number
  totalProducts: number
  totalQuantity: number
  createdAt: string
  updatedAt: string
  products: Product[]
}
