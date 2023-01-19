import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/api-errors'
import { decodeToken } from '../services/security.service.js'

export async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.replace('Bearer ', '')

  if (!token) {
    throw new UnauthorizedError('Not Authorized')
  }
  try {
    const decoded = await decodeToken(token)
    req.user = decoded
  } catch (error) {
    throw new UnauthorizedError('Not Authorized')
  }
  next()
}
