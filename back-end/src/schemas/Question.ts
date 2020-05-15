import mongoose from 'mongoose'

interface AnswerTypes {
  code: string
  text: string
  username: string
  createdAt?: string
  likes: string[]
}

interface QuestionTypes extends mongoose.Document {
  _id: string
  code: string
  text: string
  username: string
  createdAt?: string
  answers: AnswerTypes[]
}

const QuestionSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    answers: [{} as AnswerTypes],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model<QuestionTypes>('Question', QuestionSchema)
