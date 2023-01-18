import { Express } from 'express'
import user from './user.route.js'

function init_routes(app: Express) {
  app.use('/users', user)
}

export default init_routes
