import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'carts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.float('total')
      table.float('discounted_total')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE')

      table.integer('total_products')
      table.integer('total_quantity')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
