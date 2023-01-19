import { Router } from 'express'
import {
  createTodo,
  deleteTodo,
  patchTodo,
  getTodo
} from '../controllers/todoController.js'

let todoRoute = Router()

todoRoute.get('/', getTodo)

todoRoute.post('/', createTodo)

todoRoute.patch('/', patchTodo)

todoRoute.delete('/', deleteTodo)

export default todoRoute
