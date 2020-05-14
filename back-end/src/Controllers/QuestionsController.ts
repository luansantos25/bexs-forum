import { isUuid } from 'uuidv4'
import Question from '../schemas/Question'

interface AnswerTypes {
  code: string
  text: string
  username: string
  createdAt?: string
  likes: string[]
}

interface QuestionTypes {
  _id?: string
  code: string
  text: string
  username: string
  createdAt?: string
  answers: AnswerTypes[]
}

class QuestionsController {
  async all(): Promise<QuestionTypes[]> {
    const questions = await Question.find()

    return questions
  }

  async index(id: string): Promise<QuestionTypes> {
    const filterId = isUuid(id) ? 'code' : '_id'

    const question = await Question.findOne({
      [filterId]: id,
    })

    return question ?? ({} as QuestionTypes)
  }

  async create({
    code,
    username,
    text,
    answers,
  }: QuestionTypes): Promise<QuestionTypes> {
    const question = await Question.create({ code, username, text, answers })
    return question
  }

  async createAnswer({
    questionId,
    code,
    username,
    text,
  }: {
    questionId: string
    code: string
    username: string
    text: string
  }): Promise<QuestionTypes> {
    const filterId = isUuid(questionId) ? 'code' : '_id'

    const question = await Question.findOneAndUpdate(
      { [filterId]: questionId },
      { $push: { answers: { code, username, text, likes: [] } } },
      { new: true },
    )

    return question ?? ({} as QuestionTypes)
  }

  async createAnswerLike({
    questionId,
    answerCode,
    username,
  }: {
    questionId: string
    answerCode: string
    username: string
  }): Promise<QuestionTypes> {
    const filterQuestionId = isUuid(questionId) ? 'code' : '_id'

    const question = await Question.findOneAndUpdate(
      {
        [filterQuestionId]: questionId,
        answers: { $elemMatch: { code: answerCode } },
      },
      { $addToSet: { 'answers.$.likes': username } },
      { new: true },
    )

    return question ?? ({} as QuestionTypes)
  }

  async removeAnswerLike({
    questionId,
    answerCode,
    username,
  }: {
    questionId: string
    answerCode: string
    username: string
  }): Promise<QuestionTypes> {
    const filterQuestionId = isUuid(questionId) ? 'code' : '_id'

    const question = await Question.findOneAndUpdate(
      {
        [filterQuestionId]: questionId,
        answers: { $elemMatch: { code: answerCode } },
      },
      { $pull: { 'answers.$.likes': username } },
      { new: true },
    )

    return question ?? ({} as QuestionTypes)
  }
}

export default new QuestionsController()
