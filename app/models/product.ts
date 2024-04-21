import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import Category from '#models/category'
import Image from '#models/image'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

export default class Product extends BaseModel {
  // Relationships
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @hasMany(() => Image)
  declare images: HasMany<typeof Image>

  // columns
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare description: string | null

  @column()
  declare price: number

  @column()
  declare discount_percentage: number

  @column()
  declare rating: number

  @column()
  declare stock: number

  @column()
  declare brand: string

  @column()
  declare thumbnail: string

  @column()
  declare userId: number

  @column()
  declare categoryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
