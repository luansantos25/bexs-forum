import React, { useState, useEffect } from 'react'

import Answer from '../Answer'
// import { Answers } from '../../pages/General/styles'

import { StyledQuestion, AnswerContainer, Response } from './styles'

interface AnswerTypes {
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
  answers: AnswerTypes[]
}

interface AnswerForm {
  questionId: string
  text: string
}

interface Props {
  question: QuestionTypes
  userName: string
  showAnswers?: boolean
  handleAnswer?: (answer: AnswerForm) => void
  handleAnswerSubmit?: (answer: AnswerForm) => void
  handleLikeAnswer?: (answer: AnswerTypes, question: QuestionTypes) => void
}

const Question: React.FC<Props> = ({
  question,
  userName,
  handleAnswer,
  handleAnswerSubmit,
  handleLikeAnswer,
  showAnswers = true,
}: Props) => {
  const [answerText, setAnswerText] = useState<AnswerForm>({} as AnswerForm)

  useEffect(() => {
    if (handleAnswer) handleAnswer(answerText)
  })

  function handleAnswerSubmitLocal(): void {
    if (handleAnswerSubmit) {
      handleAnswerSubmit(answerText)
      setAnswerText({ ...answerText, text: '' })
    }
  }

  return (
    <StyledQuestion>
      <div className="question-content">
        <p>{question.text}</p>
        <span>Responses: {question.answers && question.answers.length}</span>
      </div>
      {showAnswers && (
        <AnswerContainer>
          {question.answers &&
            question.answers.map((answer) => (
              <Answer
                key={answer.id}
                userName={userName}
                handleLikeAnswer={() =>
                  handleLikeAnswer ? handleLikeAnswer(answer, question) : null
                }
                answer={answer}
              />
            ))}
          <Response>
            <form>
              <textarea
                value={answerText.text}
                placeholder="Write your response"
                onChange={(e) =>
                  setAnswerText({
                    questionId: question.id,
                    text: e.target.value,
                  })
                }
              />
              <button type="button" onClick={() => handleAnswerSubmitLocal()}>
                Answer
              </button>
            </form>
          </Response>
        </AnswerContainer>
      )}
    </StyledQuestion>
  )
}

export default Question
