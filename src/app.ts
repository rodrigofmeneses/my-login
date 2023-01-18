import express, { Express } from 'express'
import 'express-async-errors'
import { errorMiddleware } from './middlewares/error.js'
import init_routes from './routes/index.js'

const app: Express = express()

app.use(express.json())

init_routes(app)
app.use(errorMiddleware)

export default app
