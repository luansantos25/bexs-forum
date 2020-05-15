export interface Answer {
  code: string
  text: string
  username: string
  createdAt: string
  likes: string[]
}

export interface QuestionTypes {
  _id?: string
  code: string
  text: string
  username: string
  createdAt: string
  answers: Answer[]
}

export interface AnswerForm {
  questionId: string
  text: string
}
