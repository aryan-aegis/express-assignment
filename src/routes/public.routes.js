import { Router } from 'express'
import {
  updateUser,
  createUser,
  getUser,
  deleteUser
} from '../controllers/userController.js'
const router = Router()

router.post('/', createUser)
router.patch('/:id', updateUser)
router.get('/:id', getUser)
//for testing
router.delete('/:id', deleteUser)

export default router
