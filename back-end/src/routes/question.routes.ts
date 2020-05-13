import { Router } from 'express'

import Question from '../schemas/Question'

const questionRouter = Router()

questionRouter.get('/', async (request, response) => {
  const questions = await Question.find()

  return response.json(questions)
})

questionRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const question = await Question.findById(id)

  return response.json(question)
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

  const question = await Question.findOneAndUpdate(
    { _id: id },
    { $push: { answers: { text } } },
    { new: true },
  )

  return response.json({ test: question })
})

questionRouter.post(
  '/:questionId/answers/:answerId/likes',
  async (request, response) => {
    const { questionId, answerId } = request.params
    const { username } = request.body

    const question = await Question.findOneAndUpdate(
      { _id: questionId, answers: { $elemMatch: { _id: answerId } } },
      { $addToSet: { 'answers.$.likes': username } },
      { new: true },
    )

    return response.json({ question })
  },
)

questionRouter.delete(
  '/:questionId/answers/:answerId/likes/:username',
  async (request, response) => {
    const { questionId, answerId, username } = request.params

    const question = await Question.findOneAndUpdate(
      { _id: questionId, answers: { $elemMatch: { _id: answerId } } },
      { $pull: { 'answers.$.likes': username } },
      { new: true },
    )

    return response.json({ question })
  },
)

export default questionRouter
