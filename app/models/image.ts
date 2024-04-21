import Product from '#models/product'
import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Image extends BaseModel {
  // Relationships
  @belongsTo(() => Product)
  declare product: BelongsTo<typeof Product>

  // columns
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  @column()
  declare productId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
