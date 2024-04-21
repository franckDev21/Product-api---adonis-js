import User from '#models/user'
import { createUserValidator } from '#validators/register_user'
import type { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ request }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)

    return token
  }

  async register({ request, response }: HttpContext) {
    const data = request.all()
    const payload = await createUserValidator.validate(data)

    await User.create(payload)

    return response.status(201).json({ message: 'User created !' })
  }

  async logout({ auth, response }: HttpContext) {
    const user = await User.findOrFail(auth.user!.id)
    const token = auth.user?.currentAccessToken.identifier

    await User.accessTokens.delete(user, token!)

    return response.ok({ message: 'Logged out' })
  }
}
