import prisma from '../config/database.js'
import { NotFoundError, UnauthorizedError } from '../helpers/api-errors.js'
import { User } from '../models/user.js'

import { hashPassword, verifyPassword } from './security.service.js'

export class UserService {
  /** Services for user
   *
   */
  async register(user: User) {
    /** Register a User in Database
     *
     */
    const userDatabase = await prisma.user.findUnique({
      where: { username: user.username }
    })

    if (userDatabase) {
      throw new Error('User already exist')
    }

    user.password = await hashPassword(String(user.password))

    return prisma.user.create({
      data: {
        username: user.username,
        password: user.password,
        profile: { create: user.profile }
      }
    })
  }
  async login(user: User): Promise<string> {
    /** Login User
     *
     */
    const userDatabase = await prisma.user.findUnique({
      where: { username: user.username }
    })

    if (!userDatabase) {
      throw new NotFoundError('User Not Found')
    }

    const authorized = await verifyPassword(
      String(user.password),
      userDatabase.password
    )

    if (!authorized) {
      throw new UnauthorizedError('User Not Authorized')
    }

    return 'Successfully Login'
  }
}
