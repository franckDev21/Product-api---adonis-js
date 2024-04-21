import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'products'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title', 250).notNullable()
      table.text('description').nullable()
      table.integer('price').unsigned().notNullable()
      table.float('discount_percentage').nullable()
      table.float('rating').notNullable().defaultTo(0)
      table.integer('stock').notNullable().defaultTo(0)
      table.string('brand').notNullable()
      table.string('thumbnail').notNullable().defaultTo('default-img.png')

      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('categories')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
