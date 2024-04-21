import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from '#models/user'
import ProductCart from '#models/product_cart'

export default class Cart extends BaseModel {
  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => ProductCart)
  declare products: HasMany<typeof ProductCart>

  // columns
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare total: number

  @column()
  declare discountedTotal: number

  @column()
  declare userId: number

  @column()
  declare totalProducts: number

  @column()
  declare totalQuantity: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
