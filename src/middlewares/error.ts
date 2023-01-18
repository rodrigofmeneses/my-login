import { NextFunction, Request, Response } from 'express'
import { ApiError } from '../helpers/api-errors.js'

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const status = error.status ?? 500
  const message = error.status ? error.message : 'Internal Server Error'
  return res.status(status).json({ message: message })
}
