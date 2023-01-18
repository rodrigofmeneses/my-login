import bcrypt from 'bcrypt'

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
