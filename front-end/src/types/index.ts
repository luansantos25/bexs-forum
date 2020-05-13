export interface Answer {
  _id: string
  text: string
  username: string
  createdAt: string
  likes: string[]
}

export interface QuestionTypes {
  _id: string
  text: string
  username: string
  createdAt: string
  answers: Answer[]
}

export interface AnswerForm {
  questionId: string
  text: string
}
