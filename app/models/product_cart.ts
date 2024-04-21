import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Product from '#models/product'
import Cart from '#models/cart'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class ProductCart extends BaseModel {
  // Relationships
  @belongsTo(() => Cart)
  declare cart: BelongsTo<typeof Cart>

  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  // columns
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare productId: number

  @column()
  declare cartId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
