import { QuestionTypes, Answer } from '../types'

export default function updateLocalQuestionAnswersService({
  questions,
  answer,
  questionId,
}: {
  questions: QuestionTypes[]
  answer: Answer
  questionId: string
}): QuestionTypes[] {
  const questionData = questions.find(
    (questionItem) => questionItem.code === questionId,
  )

  if (!questionData) return {} as QuestionTypes[]

  const updatedQuestions = questions.map((questionItem) =>
    questionItem.code === questionData.code
      ? {
          ...questionItem,
          answers: [...questionItem.answers, answer],
        }
      : questionItem,
  )

  return updatedQuestions
}
