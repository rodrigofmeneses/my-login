import express from 'express'
import { UserController } from '../controllers/user.controller.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router()

const userController = new UserController()

router.get('/', auth, userController.findAll)
router.post('/register', userController.register)
router.post('/login', userController.login)

export default router
