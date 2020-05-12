import { Router } from 'express'

import User from '../schemas/User'

const userRouter = Router()

userRouter.get('/', async (request, response) => {
  const users = await User.find()

  return response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username } = request.body

  try {
    const user = await User.create({ username })
    return response.json(user)
  } catch (err) {
    return response.json({ error: err.message })
  }
})

export default userRouter
