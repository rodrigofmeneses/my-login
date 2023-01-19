import { prisma } from '../config/database.js'
import { UnauthorizedError } from '../helpers/api-errors.js'
import { User } from '../models/user.js'

import {
  encodeToken,
  hashPassword,
  verifyPassword
} from './security.service.js'

export class UserService {
  /** Services for user
   *
   */

  async findAll() {
    return prisma.user.findMany()
  }
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

    user.password = await hashPassword(user.password)

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
      throw new UnauthorizedError('Username or password invalid')
    }

    const authorized = await verifyPassword(
      user.password,
      userDatabase.password
    )

    if (!authorized) {
      throw new UnauthorizedError('Username or password invalid')
    }

    return encodeToken(user)
  }
}
