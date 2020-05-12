import React, { useState, FormEvent, useEffect } from 'react'

import { uuid } from 'uuidv4'
import Header from '../../components/Header'

import Question from '../../components/Question'

import { Container, Form, QuestionsContainer } from './styles'

interface AnswerForm {
  questionId: string
  text: string
}

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

const General: React.FC = () => {
  const userName = localStorage.getItem('@bexs/userName') ?? ''

  const [question, setQuestion] = useState('')
  const [answersForm, setAnswersForm] = useState<AnswerForm[]>([])

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

  function handleAnswerSubmit(answerData: AnswerForm): void {
    const questionData = questions.find(
      (questionItem) => questionItem.id === answerData.questionId,
    )

    if (!questionData) return

    const updated = questions.map((questionItem) =>
      questionItem.id === questionData.id
        ? {
            ...questionItem,
            answers: [
              ...questionItem.answers,
              {
                id: uuid(),
                text: answerData?.text ?? '',
                user: userName,
                creationDate: '',
                likes: [],
              },
            ],
          }
        : questionItem,
    )

    const resetAnswerForm = answersForm.map((answerItem) =>
      answerItem.questionId === questionData.id
        ? { ...answerItem, text: '' }
        : answerItem,
    )

    setQuestions(updated)
    setAnswersForm(resetAnswerForm)
  }

  function handleLikeAnswer(answer: Answer, questionData: QuestionTypes): void {
    const updatedQuestions = questions.map((questionItem) =>
      questionItem.id === questionData.id
        ? {
            ...questionItem,
            answers: questionItem.answers.map((answerItem) =>
              answerItem.id === answer.id
                ? {
                    ...answerItem,
                    likes: answerItem.likes.includes(userName)
                      ? answerItem.likes.filter((like) => like !== userName)
                      : [...answerItem.likes, userName],
                  }
                : answerItem,
            ),
          }
        : questionItem,
    )

    setQuestions(updatedQuestions)
  }

  return (
    <>
      <Header />
      <Container>
        <h1>Olá {userName}</h1>
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
              key={questionItem.id}
              userName={userName}
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
