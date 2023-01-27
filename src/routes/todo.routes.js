import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  updateTodo,
  getTodo,
  getSingleTodo
} from '../controllers/todoController.js'

import {
  authentication,
  authorization
} from '../authentication/authentication.js'

let todoRoute = Router()

todoRoute.get('/all/:id', authentication, authorization, getTodo)

todoRoute.post('/:id', authentication, authorization, createTodo)

todoRoute.get('/:id/:todoid', authentication, authorization, getSingleTodo)

//params for adding authorization
todoRoute.patch('/:id/:todoid', authentication, authorization, updateTodo)

todoRoute.delete('/:id/:todoid', authentication, authorization, deleteTodo)

export default todoRoute
