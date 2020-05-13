import React, { useState, FormEvent, useEffect } from 'react'

import { uuid } from 'uuidv4'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import Header from '../../components/Header'

import Question from '../../components/Question'

import { Container, Form, QuestionsContainer } from './styles'

import { Answer, QuestionTypes } from '../../types'

const Home: React.FC = () => {
  const username = localStorage.getItem('@bexs/userName') ?? ''

  const [question, setQuestion] = useState('')

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

  // useEffect(() => {
  //   const initialQuestions = localStorage.getItem('@benx/questions')
  //   if (initialQuestions) {
  //     setQuestions(JSON.parse(initialQuestions))
  //   }
  // }, [])

  // useEffect(() => {
  //   localStorage.setItem('@benx/questions', JSON.stringify(questions))
  // }, [questions])

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

  return (
    <>
      <Header />
      <Container>
        <div className="top-content">
          <h1>Olá {username}</h1>
          <Form onSubmit={handleQuestionSubmit}>
            <textarea
              placeholder="Type your question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <button type="submit">Send</button>
          </Form>
        </div>

        <QuestionsContainer>
          {questions.map((questionItem: QuestionTypes) => (
            <Link to={`/question/${questionItem._id}`} key={uuid()}>
              <Question
                userName={username}
                question={questionItem}
                showAnswers={false}
              />
            </Link>
          ))}
        </QuestionsContainer>
      </Container>
    </>
  )
}

export default Home
