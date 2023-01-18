import prisma from '../config/database.js'
import { User } from '../models/user.js'

import { hashPassword } from './security.service.js'

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
}
