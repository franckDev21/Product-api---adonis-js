import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      full_name: 'You name',
      email: 'exemple@gmail.com',
    }
  })
  .build()
