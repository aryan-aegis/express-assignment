import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  patchTodo,
  getTodo,
  getSingleTodo
} from '../controllers/todoController.js'

let todoRoute = Router()

todoRoute.get('/', getTodo)

todoRoute.get('/:id', getSingleTodo)

todoRoute.post('/', createTodo)

todoRoute.patch('/', patchTodo)

todoRoute.delete('/', deleteTodo)

export default todoRoute
