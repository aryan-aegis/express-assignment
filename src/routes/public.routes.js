import { Router } from 'express'
import { updateUser, createUser } from '../controllers/userController.js'
const router = Router()

router.post('/createUser', createUser)
router.patch('/updateUser', updateUser)

export default router
