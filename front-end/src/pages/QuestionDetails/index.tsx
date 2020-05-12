import React, { useState, useEffect } from 'react'

import { useParams } from 'react-router-dom'

import { uuid } from 'uuidv4'
import Header from '../../components/Header'

import Question from '../../components/Question'

import { Container, QuestionsContainer } from './styles'

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

interface AnswerForm {
  questionId: string
  text: string
}

const QuestionDetails: React.FC = () => {
  const { id } = useParams()

  const userName = localStorage.getItem('@bexs/userName') ?? ''

  const [answerForm, setAnswerForm] = useState<AnswerForm>({} as AnswerForm)

  const [question, setQuestion] = useState<QuestionTypes>({} as QuestionTypes)

  useEffect(() => {
    const questionsData = localStorage.getItem('@benx/questions')

    if (questionsData) {
      const questions: QuestionTypes[] = JSON.parse(questionsData)

      setQuestion(
        questions.find((questionItem) => questionItem.id === id) ??
          ({} as QuestionTypes),
      )
    }
  }, [id])

  function handleLikeAnswer(answer: Answer): void {
    const updatedQuestion = {
      ...question,
      answers: question.answers.map((answerItem) =>
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

    setQuestion(updatedQuestion)

    const questionsDb: string = localStorage.getItem('@benx/questions') ?? ''

    if (questionsDb) {
      const parsedQuestions: QuestionTypes[] = JSON.parse(questionsDb)

      const updatedQuestions = parsedQuestions.map((questionItem) =>
        questionItem.id === question.id ? updatedQuestion : questionItem,
      )

      localStorage.setItem('@benx/questions', JSON.stringify(updatedQuestions))
    }
  }

  function handleAnswerSubmit(answer: AnswerForm): void {
    const updated = {
      ...question,
      answers: [
        ...question.answers,
        {
          id: uuid(),
          text: answer?.text ?? '',
          user: userName,
          creationDate: '',
          likes: [],
        },
      ],
    }

    const resetAnswerForm = { ...answerForm, text: '' }

    setQuestion(updated)
    setAnswerForm(resetAnswerForm)

    const questionsDb: string = localStorage.getItem('@benx/questions') ?? ''

    if (questionsDb) {
      const parsedQuestions: QuestionTypes[] = JSON.parse(questionsDb)

      const updatedQuestions = parsedQuestions.map((questionItem) =>
        questionItem.id === question.id ? updated : questionItem,
      )

      localStorage.setItem('@benx/questions', JSON.stringify(updatedQuestions))
    }
  }

  return (
    <>
      <Header />
      <Container>
        <QuestionsContainer>
          <Question
            userName={userName}
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
