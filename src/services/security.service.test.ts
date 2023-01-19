import { describe, expect, test } from 'vitest'
import { User } from '../models/user.js'
import {
  decodeToken,
  encodeToken,
  hashPassword,
  verifyPassword
} from './security.service.js'

describe('Hash password tests', () => {
  test('May return a hashed password different of given password', async () => {
    const password = '123'
    const hashedPassword = await hashPassword(password)

    expect(hashedPassword).not.toBe('123')
  })

  test('May return differents hashs from same password', async () => {
    const password = '123'
    const hashedPassword1 = await hashPassword(password)
    const hashedPassword2 = await hashPassword(password)

    expect(hashedPassword1).not.toBe(hashedPassword2)
  })

  test('Hashed password may be verified with correct password', async () => {
    const password = '123'
    const hashedPassword = await hashPassword(password)
    const verified = await verifyPassword(password, hashedPassword)

    expect(verified).toBe(true)
  })

  test('Hashed password may be fail with wrong password', async () => {
    const password = '123'
    const wrongPassword = 'batata'
    const hashedPassword = await hashPassword(password)
    const verified = await verifyPassword(wrongPassword, hashedPassword)

    expect(verified).toBe(false)
  })
})

describe('Tokens tests', () => {
  test('.env file may have a SECRET_KEY for token work', () => {
    expect(process.env.SECRET_KEY)
  })

  test('May encode User data to a JWT token', async () => {
    const data: User = { username: 'test', password: 'teste' }
    const token = await encodeToken(data)

    expect(token).not.toBe(data)
  })

  test('May decode JWT token to same given data', async () => {
    const data: User = { username: 'test', password: 'teste' }
    const token = await encodeToken(data)

    const decodedData: User = await decodeToken(token)

    expect(data).toStrictEqual(decodedData)
  })
})
