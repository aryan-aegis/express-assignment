import express from 'express'
import morgan from 'morgan'
import { PORT } from './env.js'
import router from './routes/public.routes.js'
import todoRouter from './routes/todo.routes.js'
import { apiErrorHandler } from './error/apiErrorHandler.js'
import ApiError from './error/ApiError.js'

const app = express()
app.use(express.json())
app.use(morgan('dev'))

app.use('/user', router)
app.use('/todo', todoRouter)

app.use(function (req, res, next) {
  return next(ApiError.NotFound(`Path to ${req.path} not found`))
})

app.use(apiErrorHandler)

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
