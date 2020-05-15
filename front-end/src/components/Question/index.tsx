import React, { useState, useEffect } from 'react'

import { animateScroll } from 'react-scroll'

import { formatDistanceToNow, parseISO } from 'date-fns'
import Answer from '../Answer'

import { StyledQuestion, AnswerContainer, Response } from './styles'

import { Answer as AnswerTypes, QuestionTypes, AnswerForm } from '../../types'

interface Props {
  question: QuestionTypes
  userName: string
  showAnswers?: boolean
  handleCreateAnswer?: (answer: AnswerForm) => void
  handleLikeAnswer?: (answer: AnswerTypes, question: QuestionTypes) => void
}

const Question: React.FC<Props> = ({
  question,
  userName,
  handleCreateAnswer,
  handleLikeAnswer,
  showAnswers = true,
}: Props) => {
  const [answerText, setAnswerText] = useState<AnswerForm>({} as AnswerForm)
  const [countAnswers, setCountAnswers] = useState(0)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (loaded && question.answers && question.answers.length > countAnswers) {
      animateScroll.scrollToBottom({
        containerId: question.code,
        duration: 800,
      })
    }
    setLoaded(true)
    setCountAnswers(question?.answers?.length ?? 0)
  }, [question, countAnswers, loaded])

  function handleCreateAnswerLocal(): void {
    if (handleCreateAnswer) {
      handleCreateAnswer(answerText)
      setAnswerText({ ...answerText, text: '' })
    }
  }

  return (
    <StyledQuestion>
      <div className="question-content">
        <p>{question.text}</p>
        <span className="response-number">
          Responses: {question.answers && question.answers.length}
        </span>
        <span className="time-ago">
          {question.createdAt &&
            formatDistanceToNow(parseISO(question.createdAt), {
              addSuffix: true,
            })}
        </span>
      </div>
      {showAnswers && (
        <div>
          <AnswerContainer id={question.code}>
            {question.answers &&
              question.answers.map((answer) => (
                <Answer
                  key={answer.code}
                  userName={userName}
                  createdAt={answer.createdAt}
                  handleLikeAnswer={() =>
                    handleLikeAnswer ? handleLikeAnswer(answer, question) : null
                  }
                  answer={answer}
                />
              ))}
          </AnswerContainer>
          <Response>
            <form>
              <textarea
                value={answerText.text}
                placeholder="Write your response"
                onChange={(e) =>
                  setAnswerText({
                    questionId: question.code,
                    text: e.target.value,
                  })
                }
                onKeyPress={(e) => {
                  return (
                    e.charCode === 13 &&
                    answerText?.text?.length > 5 &&
                    handleCreateAnswerLocal()
                  )
                }}
              />
              <button
                disabled={!(answerText?.text?.length > 5)}
                type="button"
                onClick={() => handleCreateAnswerLocal()}
              >
                Answer
              </button>
            </form>
          </Response>
        </div>
      )}
    </StyledQuestion>
  )
}

export default Question
