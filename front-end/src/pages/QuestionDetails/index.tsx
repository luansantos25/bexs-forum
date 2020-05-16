import React, { useState, useEffect } from 'react'

import { useParams, Link } from 'react-router-dom'

import { FaChevronLeft } from 'react-icons/fa'

import api from '../../services/api'

import Question from '../../components/Question'

import { Container, QuestionsContainer } from './styles'

import { Answer, QuestionTypes, AnswerForm } from '../../types'

import createAnswerService from '../../services/createAnswerService'
import updateLocalQuestionAnswersService from '../../services/updateLocalQuestionAnswersService'

const QuestionDetails: React.FC = () => {
  const { id } = useParams()

  const username = localStorage.getItem('@bexs/username') ?? ''

  const [answerForm, setAnswerForm] = useState<AnswerForm>({} as AnswerForm)

  const [question, setQuestion] = useState<QuestionTypes>({} as QuestionTypes)

  useEffect(() => {
    async function getData(): Promise<void> {
      const questionData = await api.get(`/questions/${id}`)
      setQuestion(questionData.data)
    }

    getData()
  }, [id])

  function handleLikeAnswer(answer: Answer): void {
    const updatedQuestion = {
      ...question,
      answers: question.answers.map((answerItem) =>
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

    setQuestion(updatedQuestion)

    const liked = answer.likes.includes(username)

    if (!liked) {
      api.post(`/questions/${question.code}/answers/${answer.code}/likes`, {
        username,
      })
    } else {
      api.delete(
        `/questions/${question.code}/answers/${answer.code}/likes/${username}`,
      )
    }
  }

  function handleCreateAnswer(answer: AnswerForm): void {
    const updated = createAnswerService({
      questionCode: question.code,
      text: answer.text,
      username,
    })

    const resetAnswerForm = { ...answerForm, text: '' }

    const [updatedQuestion] = updateLocalQuestionAnswersService({
      answer: updated,
      questionId: question.code,
      questions: [question],
    })

    setQuestion(updatedQuestion)
    setAnswerForm(resetAnswerForm)
  }

  return (
    <>
      <Container>
        <Link to="/home">
          <FaChevronLeft />
          Back
        </Link>
        <QuestionsContainer>
          <Question
            userName={username}
            question={question}
            handleCreateAnswer={handleCreateAnswer}
            handleLikeAnswer={handleLikeAnswer}
          />
        </QuestionsContainer>
      </Container>
    </>
  )
}

export default QuestionDetails
