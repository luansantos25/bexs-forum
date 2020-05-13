import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { uuid } from 'uuidv4'

import api from '../../services/api'

import Header from '../../components/Header'

import Question from '../../components/Question'

import { Container, QuestionsContainer } from './styles'

import { Answer, QuestionTypes, AnswerForm } from '../../types'

const QuestionDetails: React.FC = () => {
  const { id } = useParams()

  const username = localStorage.getItem('@bexs/userName') ?? ''

  const [answerForm, setAnswerForm] = useState<AnswerForm>({} as AnswerForm)

  const [question, setQuestion] = useState<QuestionTypes>({} as QuestionTypes)

  useEffect(() => {
    async function getData(): Promise<void> {
      const questionData = await api.get(`/questions/${id}`)

      setQuestion(questionData.data)

      console.log(questionData)
    }

    getData()
  }, [id])

  useEffect(() => {
    // const questionsData = localStorage.getItem('@benx/questions')
    // if (questionsData) {
    //   const questions: QuestionTypes[] = JSON.parse(questionsData)
    //   setQuestion(
    //     questions.find((questionItem) => questionItem._id === id) ??
    //       ({} as QuestionTypes),
    //   )
    // }
  }, [id])

  function handleLikeAnswer(answer: Answer): void {
    const updatedQuestion = {
      ...question,
      answers: question.answers.map((answerItem) =>
        answerItem._id === answer._id
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

    // const questionsDb: string = localStorage.getItem('@benx/questions') ?? ''

    // if (questionsDb) {
    //   const parsedQuestions: QuestionTypes[] = JSON.parse(questionsDb)

    //   const updatedQuestions = parsedQuestions.map((questionItem) =>
    //     questionItem._id === question._id ? updatedQuestion : questionItem,
    //   )

    //   localStorage.setItem('@benx/questions', JSON.stringify(updatedQuestions))
    // }

    const liked = answer.likes.includes(username)

    if (!liked) {
      console.log('liking')
      api.post(`/questions/${question._id}/answers/${answer._id}/likes`, {
        username,
      })
    } else {
      console.log('disliking')

      api.delete(
        `/questions/${question._id}/answers/${answer._id}/likes/${username}`,
      )
    }
  }

  function handleAnswerSubmit(answer: AnswerForm): void {
    const updated = {
      ...question,
      answers: [
        ...question.answers,
        {
          _id: uuid(),
          text: answer?.text ?? '',
          username,
          createdAt: '',
          likes: [],
        },
      ],
    }

    const resetAnswerForm = { ...answerForm, text: '' }

    setQuestion(updated)
    setAnswerForm(resetAnswerForm)

    // const questionsDb: string = localStorage.getItem('@benx/questions') ?? ''

    // if (questionsDb) {
    //   const parsedQuestions: QuestionTypes[] = JSON.parse(questionsDb)

    //   const updatedQuestions = parsedQuestions.map((questionItem) =>
    //     questionItem._id === question._id ? updated : questionItem,
    //   )

    //   localStorage.setItem('@benx/questions', JSON.stringify(updatedQuestions))
    // }

    api.post(`/questions/${question._id}/answers`, { text: answer.text })
  }

  return (
    <>
      <Header />
      <Container>
        <QuestionsContainer>
          <Question
            userName={username}
            question={question}
            handleAnswerSubmit={handleAnswerSubmit}
            handleLikeAnswer={handleLikeAnswer}
          />
        </QuestionsContainer>
      </Container>
    </>
  )
}

export default QuestionDetails
