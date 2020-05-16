import React, { useState, useEffect, useCallback } from 'react'

import { uuid } from 'uuidv4'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import MakeQuestion from '../../components/MakeQuestion'
import Question from '../../components/Question'
import createQuestionService from '../../services/createQuestionService'

import Filter from '../../components/Filter'

import { Container, QuestionsContainer } from './styles'

import { QuestionTypes } from '../../types'

const Home: React.FC = () => {
  const username = localStorage.getItem('@bexs/username') ?? ''

  const [questions, setQuestions] = useState<QuestionTypes[]>([])
  const [allQuestions, setAllQuestions] = useState<QuestionTypes[]>([])

  useEffect(() => {
    async function getData(): Promise<void> {
      const questionsData = await api.get('/questions')

      setQuestions(questionsData.data)
      setAllQuestions(questionsData.data)
    }

    getData()
  }, [])

  function handleCreateQuestion(question: string): void {
    const newQuestion = createQuestionService({
      question,
      username,
    })

    setQuestions([newQuestion, ...questions])
    setAllQuestions([newQuestion, ...questions])
  }

  const handleSearchFilter = useCallback(
    ({
      textToSearch,
      noAnswered,
    }: {
      textToSearch: string
      noAnswered: boolean
    }): void => {
      const filteredQuestions = allQuestions
        .filter((questionItem) =>
          questionItem.text.toLowerCase().includes(textToSearch),
        )
        .filter((questionItem) => {
          return noAnswered ? !(questionItem.answers.length > 0) : true
        })

      setQuestions(filteredQuestions)
    },
    [allQuestions],
  )

  return (
    <>
      <Container>
        <div className="top-content">
          <h1 className="title">Hello, {username}</h1>
          <MakeQuestion handleCreateQuestion={handleCreateQuestion} />
          <Filter handleSearchFilter={handleSearchFilter} />
        </div>

        <QuestionsContainer data-testid="questions-list">
          {questions.map((questionItem: QuestionTypes) => (
            <Link to={`/question/${questionItem.code}`} key={uuid()}>
              <Question
                userName={username}
                question={questionItem}
                showAnswers={false}
                asLink
              />
            </Link>
          ))}
        </QuestionsContainer>
      </Container>
    </>
  )
}

export default Home
