import bcrypt from 'bcrypt'
import 'dotenv/config'
import jwt, { JwtPayload, Secret } from 'jsonwebtoken'
import { User } from '../models/user'

if (!process.env.SECRET_KEY) {
  throw new Error('Secret key not defined')
}

const SECRET_KEY: Secret = process.env.SECRET_KEY

export async function hashPassword(
  plainText: string,
  saltRounds: number = 10
): Promise<string> {
  return bcrypt.hash(plainText, saltRounds)
}

export async function verifyPassword(
  password: string,
  hashedPassword: string
): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export async function encodeToken(
  payload: User,
  expiresInMinutes: number = 60
): Promise<string> {
  const token = jwt.sign(
    {
      data: payload,
      exp: Math.floor(Date.now() / 1000) + 60 * expiresInMinutes
    },
    SECRET_KEY
  )
  return token
}

export async function decodeToken(token: string): Promise<User> {
  const { data } = jwt.verify(token, SECRET_KEY) as JwtPayload
  return data
}
