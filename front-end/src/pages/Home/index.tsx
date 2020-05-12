import React, { useState, FormEvent, useEffect } from 'react'

import { uuid } from 'uuidv4'
import { Link } from 'react-router-dom'
import Header from '../../components/Header'

import Question from '../../components/Question'

import { Container, Form, QuestionsContainer } from './styles'

interface Answer {
  id: string
  text: string
  user: string
  creationDate: string
  likes: string[]
}

interface QuestionTypes {
  id: string
  text: string
  user: string
  creationDate: string
  answers: Answer[]
}

const Home: React.FC = () => {
  const userName = localStorage.getItem('@bexs/userName') ?? ''

  const [question, setQuestion] = useState('')

  const [questions, setQuestions] = useState<QuestionTypes[]>([
    {
      id: uuid(),
      text: 'What is your name?',
      user: 'username',
      creationDate: '2020-01-01 12:00:00',
      answers: [
        {
          id: uuid(),
          text: 'Luan Santos',
          user: 'another.username',
          creationDate: '2020-01-01 12:00:00',
          likes: [],
        },
        {
          id: uuid(),
          text: 'Bruno Santos',
          user: 'another.username',
          creationDate: '2020-01-01 12:00:00',
          likes: [],
        },
      ],
    },
    {
      id: uuid(),
      text: 'What is your name?',
      user: 'username',
      creationDate: '2020-01-01 12:00:00',
      answers: [
        {
          id: uuid(),
          text: 'Luan R. Santos',
          user: 'another.username',
          creationDate: '2020-01-01 12:00:00',
          likes: [],
        },
        {
          id: uuid(),
          text: 'Bruno A. Santos',
          user: 'another.username',
          creationDate: '2020-01-01 12:00:00',
          likes: ['luanr'],
        },
      ],
    },
  ])

  useEffect(() => {
    const initialQuestions = localStorage.getItem('@benx/questions')
    if (initialQuestions) {
      setQuestions(JSON.parse(initialQuestions))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('@benx/questions', JSON.stringify(questions))
  }, [questions])

  function handleQuestionSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()

    const newQuestion = {
      id: uuid(),
      text: question,
      user: userName,
      creationDate: '',
      answers: [],
    }

    setQuestions([newQuestion, ...questions])
    setQuestion('')
  }

  return (
    <>
      <Header />
      <Container>
        <div className="top-content">
          <h1>Olá {userName}</h1>
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
          {questions.map((questionItem) => (
            <Link to={`/question/${questionItem.id}`} key={uuid()}>
              <Question
                userName={userName}
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
