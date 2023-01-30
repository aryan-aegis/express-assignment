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

import {
  createUserVal,
  loginUserVal,
  updateUserVal
} from '../validation/payloadValidation.js'

const router = Router()

router.post('/', createUserVal, createUser)
router.post('/login', loginUserVal, loginUser)
router.patch('/:id', updateUserVal, authentication, authorization, updateUser)
router.get('/:id', authentication, getUser)
//for testing
router.delete('/:id',authentication, authorization, deleteUser)

export default router
