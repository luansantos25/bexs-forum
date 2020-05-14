import { Router } from 'express'

import QuestionsController from '../Controllers/QuestionsController'

const questionRouter = Router()

questionRouter.get('/', async (request, response) => {
  const questions = await QuestionsController.all()

  return response.json(questions)
})

questionRouter.get('/:id', async (request, response) => {
  const { id } = request.params

  const question = await QuestionsController.index(id)

  return response.json(question)
})

questionRouter.post('/', async (request, response) => {
  const { code, username, text, answers } = request.body

  const question = await QuestionsController.create({
    code,
    username,
    text,
    answers,
  })

  return response.json(question)
})

questionRouter.post('/:id/answers', async (request, response) => {
  const { id } = request.params
  const { code, text, username } = request.body

  const updatedQuestion = await QuestionsController.createAnswer({
    questionId: id,
    code,
    text,
    username,
  })

  return response.json(updatedQuestion)
})

questionRouter.post(
  '/:questionId/answers/:answerCode/likes',
  async (request, response) => {
    const { questionId, answerCode } = request.params
    const { username } = request.body

    const updatedQuestion = await QuestionsController.createAnswerLike({
      answerCode,
      questionId,
      username,
    })

    return response.json(updatedQuestion)
  },
)

questionRouter.delete(
  '/:questionId/answers/:answerCode/likes/:username',
  async (request, response) => {
    const { questionId, answerCode, username } = request.params

    const updatedQuestion = await QuestionsController.removeAnswerLike({
      answerCode,
      questionId,
      username,
    })

    return response.json(updatedQuestion)
  },
)

export default questionRouter
