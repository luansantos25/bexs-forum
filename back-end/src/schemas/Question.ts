import mongoose from 'mongoose'

const AnswersSchema = new mongoose.Schema(
  {
    text: String,
    likes: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
)

const QuestionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    answers: [AnswersSchema],
  },
  {
    timestamps: true,
  },
)

export default mongoose.model('Question', QuestionSchema)
