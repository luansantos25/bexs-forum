import { Router } from 'express'
import userRouter from './user.routes'
import questionRouter from './question.routes'

const routes = Router()

routes.use('/users', userRouter)
routes.use('/questions', questionRouter)

export default routes
