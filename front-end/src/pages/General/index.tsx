import React, { useState, useEffect } from 'react'

import api from '../../services/api'

import Question from '../../components/Question'

import { Container, QuestionsContainer } from './styles'

import MakeQuestion from '../../components/MakeQuestion'

import { Answer, QuestionTypes, AnswerForm } from '../../types'

import createQuestionService from '../../services/createQuestionService'
import createAnswerService from '../../services/createAnswerService'
import updateLocalQuestionAnswersService from '../../services/updateLocalQuestionAnswersService'
import createLikeQuestionAnswerService from '../../services/createLikeQuestionAnswerService'

const General: React.FC = () => {
  const username = localStorage.getItem('@bexs/userName') ?? ''

  const [questions, setQuestions] = useState<QuestionTypes[]>([])

  useEffect(() => {
    async function getData(): Promise<void> {
      const questionsData = await api.get('/questions')

      setQuestions(questionsData.data)
    }

    getData()
  }, [])

  function handleCreateQuestion(question: string): void {
    const newQuestion = createQuestionService({
      question,
      username,
    })

    setQuestions([newQuestion, ...questions])
  }

  function handleCreateAnswer(answerData: AnswerForm): void {
    const answer = createAnswerService({
      questionCode: answerData.questionId,
      text: answerData.text,
      username,
    })

    const updated = updateLocalQuestionAnswersService({
      answer,
      questions,
      questionId: answerData.questionId,
    })

    setQuestions(updated)
  }

  function handleLikeAnswer(answer: Answer, questionData: QuestionTypes): void {
    const updatedQuestions = createLikeQuestionAnswerService({
      answer,
      questionCode: questionData.code,
      questions,
      username,
    })

    setQuestions(updatedQuestions)
  }

  return (
    <>
      <Container>
        <div className="top-content">
          <h1>Olá {username}</h1>
          <MakeQuestion handleCreateQuestion={handleCreateQuestion} />
        </div>

        <QuestionsContainer>
          {questions.map((questionItem) => (
            <Question
              key={questionItem.code}
              userName={username}
              question={questionItem}
              handleCreateAnswer={handleCreateAnswer}
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
