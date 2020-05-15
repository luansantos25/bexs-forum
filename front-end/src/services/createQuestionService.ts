import { uuid } from 'uuidv4'

import api from './api'

import { QuestionTypes } from '../types'

export default function handleQuestionService({
  question,
  username,
}: {
  question: string
  username: string
}): QuestionTypes {
  const newQuestion = {
    code: uuid(),
    text: question,
    username,
    createdAt: new Date().toISOString(),
    answers: [],
  }

  api.post('/questions', newQuestion)

  return newQuestion
}
