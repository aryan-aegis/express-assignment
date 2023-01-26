import { Router } from 'express'
import {
  updateUser,
  createUser,
  getUser,
  deleteUser,
  loginUser
} from '../controllers/userController.js'

import {
  authentication,
  authorization
} from '../authentication/authentication.js'

const router = Router()

router.post('/', createUser)
router.post('/login', loginUser)
router.patch('/:id', authentication, authorization, updateUser)
router.get('/:id', authentication, getUser)
//for testing
router.delete('/:id', authentication, authorization, deleteUser)

export default router
