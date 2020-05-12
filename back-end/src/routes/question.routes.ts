import { Router } from 'express'

import Question from '../schemas/Question'

const questionRouter = Router()

questionRouter.get('/', async (request, response) => {
  const users = await Question.find()

  return response.json(users)
})

questionRouter.post('/', async (request, response) => {
  const { username, text, answers } = request.body

  try {
    const user = await Question.create({ user: username, text, answers })
    return response.json(user)
  } catch (err) {
    return response.json({ error: err.message })
  }
})

questionRouter.post('/:id/answers', async (request, response) => {
  const { id } = request.params
  const { text } = request.body

  // const question = await Question.findOne({ _id: id })

  const question = await Question.findOneAndUpdate(
    { _id: id },
    { $push: { answers: { text } } },
    { new: true },
  )

  return response.json({ test: question })

  // try {
  //   const user = await Question.create({ user: username, text, answers })
  //   return response.json(user)
  // } catch (err) {
  //   return response.json({ error: err.message })
  // }
})

export default questionRouter
