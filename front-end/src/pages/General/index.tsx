import React, { useState, FormEvent, useEffect } from 'react'

import { uuid } from 'uuidv4'
import Header from '../../components/Header'

import api from '../../services/api'

import Question from '../../components/Question'

import { Container, Form, QuestionsContainer } from './styles'

import { Answer, QuestionTypes, AnswerForm } from '../../types'

const General: React.FC = () => {
  const username = localStorage.getItem('@bexs/userName') ?? ''

  const [question, setQuestion] = useState('')
  const [answersForm, setAnswersForm] = useState<AnswerForm[]>([])

  const [questions, setQuestions] = useState<QuestionTypes[]>([
    {
      _id: uuid(),
      text: 'What is your name?',
      username: 'username',
      createdAt: '2020-01-01 12:00:00',
      answers: [
        {
          _id: uuid(),
          text: 'Luan Santos',
          username: 'another.username',
          createdAt: '2020-01-01 12:00:00',
          likes: [],
        },
        {
          _id: uuid(),
          text: 'Bruno Santos',
          username: 'another.username',
          createdAt: '2020-01-01 12:00:00',
          likes: [],
        },
      ],
    },
    {
      _id: uuid(),
      text: 'What is your name?',
      username: 'username',
      createdAt: '2020-01-01 12:00:00',
      answers: [
        {
          _id: uuid(),
          text: 'Luan R. Santos',
          username: 'another.username',
          createdAt: '2020-01-01 12:00:00',
          likes: [],
        },
        {
          _id: uuid(),
          text: 'Bruno A. Santos',
          username: 'another.username',
          createdAt: '2020-01-01 12:00:00',
          likes: ['luanr'],
        },
      ],
    },
  ])

  useEffect(() => {
    async function getData(): Promise<void> {
      const questionsData = await api.get('/questions')

      setQuestions(questionsData.data)
    }

    getData()
  }, [])

  function handleQuestionSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const newQuestion = {
      _id: uuid(),
      text: question,
      username,
      createdAt: '',
      answers: [],
    }

    setQuestions([newQuestion, ...questions])
    setQuestion('')

    api.post('/questions', newQuestion)
  }

  function handleAnswerSubmit(answerData: AnswerForm): void {
    const questionData = questions.find(
      (questionItem) => questionItem._id === answerData.questionId,
    )

    if (!questionData) return

    const updated = questions.map((questionItem) =>
      questionItem._id === questionData._id
        ? {
            ...questionItem,
            answers: [
              ...questionItem.answers,
              {
                _id: uuid(),
                text: answerData?.text ?? '',
                username,
                createdAt: '',
                likes: [],
              },
            ],
          }
        : questionItem,
    )

    const resetAnswerForm = answersForm.map((answerItem) =>
      answerItem.questionId === questionData._id
        ? { ...answerItem, text: '' }
        : answerItem,
    )

    setQuestions(updated)
    setAnswersForm(resetAnswerForm)

    api.post(`/questions/${questionData._id}/answers`, {
      text: answerData.text,
    })
  }

  function handleLikeAnswer(answer: Answer, questionData: QuestionTypes): void {
    const updatedQuestions = questions.map((questionItem) =>
      questionItem._id === questionData._id
        ? {
            ...questionItem,
            answers: questionItem.answers.map((answerItem) =>
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
        : questionItem,
    )

    setQuestions(updatedQuestions)

    const liked = answer.likes.includes(username)

    if (!liked) {
      console.log('liking')
      api.post(`/questions/${questionData._id}/answers/${answer._id}/likes`, {
        username,
      })
    } else {
      console.log('disliking')

      api.delete(
        `/questions/${questionData._id}/answers/${answer._id}/likes/${username}`,
      )
    }
  }

  return (
    <>
      <Header />
      <Container>
        <h1>Olá {username}</h1>
        <Form onSubmit={handleQuestionSubmit}>
          <textarea
            placeholder="Type your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
          <button type="submit">Send</button>
        </Form>

        <QuestionsContainer>
          {questions.map((questionItem) => (
            <Question
              key={questionItem._id}
              userName={username}
              question={questionItem}
              handleAnswerSubmit={handleAnswerSubmit}
              handleLikeAnswer={(answer, questionData) =>
                handleLikeAnswer(answer, questionData)
              }
            />
          ))}
        </QuestionsContainer>
      </Container>
    </>
  )
}

export default General
