declare namespace Express {
  declare interface Request {
    user: { username: string; password: string }
  }
}
