import { Request, Response } from 'express'
import { UserService } from '../services/user.service.js'

const userService = new UserService()

export class UserController {
  /** Controllers to user
   *
   */

  async findAll(req: Request, res: Response) {
    const users = await userService.findAll()
    res.json(req.user)
  }
  async register(req: Request, res: Response) {
    const user = await userService.register(req.body)
    res.status(201).json(user)
  }
  async login(req: Request, res: Response) {
    const acessToken = await userService.login(req.body)
    res.json({ acessToken: acessToken })
  }
}
