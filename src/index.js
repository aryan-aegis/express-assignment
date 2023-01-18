import express from 'express'
import { PORT } from './env'
import router from './routes/public.routes'

const app = express()

app.use('/', router)

app.listen(PORT, () => console.log(`Server running on Port ${PORT}`))
