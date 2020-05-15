import { uuid } from 'uuidv4'

import api from './api'

import { Answer } from '../types'

export default function handleAnswerService({
  questionCode,
  username,
  text,
}: {
  questionCode: string
  username: string
  text: string
}): Answer {
  const answer = {
    code: uuid(),
    text,
    username,
    createdAt: new Date().toISOString(),
    likes: [],
  }

  api.post(`/questions/${questionCode}/answers`, answer)

  return answer
}
