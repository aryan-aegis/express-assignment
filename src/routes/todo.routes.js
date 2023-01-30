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

//this a how to use a common middlewares who uses request params

todoRoute.get('/all/:id',authentication ,authorization, getTodo)

todoRoute.post('/:id', authentication,authorization, createTodo)

todoRoute.use("/:id",authentication)
todoRoute.use("/:id",authorization)

todoRoute.get('/:id/:todoid',  getSingleTodo)
//params for adding authorization
todoRoute.patch('/:id/:todoid',  updateTodo)

todoRoute.delete('/:id/:todoid',  deleteTodo)

export default todoRoute
