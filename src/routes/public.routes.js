import { Router } from 'express'
import {
  updateUser,
  createUser,
  getUser
} from '../controllers/userController.js'
const router = Router()

router.post('/createUser', createUser)
router.patch('/updateUser', updateUser)
router.get('/getUser/:id', getUser)

export default router
