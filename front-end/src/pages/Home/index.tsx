import React, { useState, FormEvent, useEffect } from 'react'

import { FaHeart } from 'react-icons/fa'

import { uuid } from 'uuidv4'

import { Form, QuestionsContainer, Question, Answers, Response } from './styles'

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

interface Question {
  id: string
  text: string
  user: string
  creationDate: string
  answers: Answer[]
}

const Home: React.FC = () => {
  const userName = localStorage.getItem('@bexs/userName') ?? ''

  const [question, setQuestion] = useState('')
  const [answersForm, setAnswersForm] = useState<AnswerForm[]>([])

  const [questions, setQuestions] = useState<Question[]>([
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

    // console.log(question)
  }

  function handleAnswer(questionAnswer: AnswerForm): void {
    // console.log(questionAnswer)

    const unchangedanswers = answersForm.filter(
      (answer) => answer.questionId !== questionAnswer.questionId,
    )

    setAnswersForm([...unchangedanswers, questionAnswer])

    // console.log(answers)
  }

  function handleAnswerSubmit(questionData: Question): void {
    // event.preventDefault()

    const newAnswer = answersForm.find(
      (answerItem) => answerItem.questionId === questionData.id,
    )

    const updated = questions.map((questionItem) =>
      questionItem.id === questionData.id
        ? {
            ...questionItem,
            answers: [
              ...questionItem.answers,
              {
                id: uuid(),
                text: newAnswer?.text ?? '',
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

    console.log(updated)
  }

  function handleLikeAnswer(questionData: Question, answer: Answer): void {
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
          <Question key={questionItem.id}>
            <div className="question-content">{questionItem.text}</div>
            <Answers>
              {questionItem.answers.map((answer) => (
                <div className="answer-item" key={answer.id}>
                  <img
                    src="https://api.adorable.io/avatars/285/abott@adorable.png"
                    alt="User Avatar"
                  />
                  <div className="answer-data">
                    <strong>{answer.user}</strong>
                    <div className="answer-text">{answer.text}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleLikeAnswer(questionItem, answer)}
                  >
                    <FaHeart
                      className={
                        answer.likes.find((like) => like === userName)
                          ? 'liked'
                          : ''
                      }
                    />
                    {answer.likes.length}
                  </button>
                </div>
              ))}
            </Answers>
            <Response>
              <form>
                <textarea
                  value={
                    answersForm.find(
                      (answer) => answer.questionId === questionItem.id,
                    )?.text ?? ''
                  }
                  onChange={(e) =>
                    handleAnswer({
                      questionId: questionItem.id,
                      text: e.target.value,
                    })
                  }
                />
                <button
                  type="button"
                  onClick={() => handleAnswerSubmit(questionItem)}
                >
                  Answer
                </button>
              </form>
            </Response>
          </Question>
        ))}
      </QuestionsContainer>
    </>
  )
}

export default Home
