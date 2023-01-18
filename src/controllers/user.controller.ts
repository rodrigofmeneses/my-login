import { Request, Response } from 'express'
import { UserService } from '../services/user.service.js'

const userService = new UserService()

export class UserController {
  /** Controllers to user
   *
   */
  async register(req: Request, res: Response) {
    const user = await userService.register(req.body)
    res.status(201).json(user)
  }
}
