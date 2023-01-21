import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  patchTodo,
  getTodo,
  getSingleTodo
} from '../controllers/todoController.js'

let todoRoute = Router()

todoRoute.get('/all/:userid', getTodo)

todoRoute.get('/:id', getSingleTodo)

todoRoute.post('/', createTodo)

todoRoute.patch('/:todoid', patchTodo)

todoRoute.delete('/:todoid', deleteTodo)

export default todoRoute
