import mongoose from 'mongoose'

interface AnswerTypes {
  // _id?: string
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

// const AnswersSchema = new mongoose.Schema(
//   {
//     code: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     text: String,
//     likes: [
//       {
//         type: String,
//       },
//     ],
//   },
//   {
//     timestamps: true,
//   },
// )

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
