import api from './api'

import { QuestionTypes, Answer } from '../types'

export default function createLikeQuestionAnswerService({
  questions,
  questionCode,
  username,
  answer,
}: {
  questions: QuestionTypes[]
  username: string
  questionCode: string
  answer: Answer
}): QuestionTypes[] {
  const updatedQuestions = questions.map((questionItem) =>
    questionItem.code === questionCode
      ? {
          ...questionItem,
          answers: questionItem.answers.map((answerItem) =>
            answerItem.code === answer.code
              ? {
                  ...answerItem,
                  likes: answerItem.likes.includes(username)
                    ? answerItem.likes.filter((like) => like !== username)
                    : [...answerItem.likes, username],
                }
              : answerItem,
          ),
        }
      : questionItem,
  )

  const liked = answer.likes.includes(username)

  if (!liked) {
    api.post(`/questions/${questionCode}/answers/${answer.code}/likes`, {
      username,
    })
  } else {
    api.delete(
      `/questions/${questionCode}/answers/${answer.code}/likes/${username}`,
    )
  }

  return updatedQuestions
}
