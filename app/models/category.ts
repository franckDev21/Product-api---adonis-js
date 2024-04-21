import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import Product from '#models/product'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Category extends BaseModel {
  // Relationships
  @hasMany(() => Product)
  declare products: HasMany<typeof Product>

  // columns
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare image: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
