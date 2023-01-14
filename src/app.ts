import express from 'express'

import { Request, Response, Router } from 'express'

const app = express()
const route = Router()

app.use(express.json())

route.get('/', hello)

function hello(req: Request, res: Response) {
  res.json({ message: 'hello world with Typescript AAA' })
}

app.use(route)

export default app
