import { Router } from 'express'
import questionRouter from './question.routes'

const routes = Router()

routes.use('/questions', questionRouter)

export default routes
