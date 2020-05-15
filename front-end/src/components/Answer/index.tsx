import React from 'react'

import { formatDistanceToNow, parseISO } from 'date-fns'

import { FaHeart } from 'react-icons/fa'

import { StyledAnswer } from './styles'

import { Answer as AnswerTypes } from '../../types'

interface Props {
  userName: string
  answer: AnswerTypes
  createdAt: string
  handleLikeAnswer(answer: AnswerTypes): void
}

const Answer: React.FC<Props> = ({
  userName,
  answer,
  createdAt,
  handleLikeAnswer,
}: Props) => {
  return (
    <StyledAnswer>
      <div className="answer">
        <img
          src={`https://ui-avatars.com/api/?name=${answer.username}&background=bdc3c7&color=fff`}
          alt="User Avatar"
        />
        <div className="answer-content">
          <div className="answer-data">
            <strong>
              {answer.username}{' '}
              <span className="time-ago">
                {createdAt &&
                  formatDistanceToNow(parseISO(createdAt), {
                    addSuffix: true,
                  })}
              </span>
            </strong>
            <div className="answer-text">{answer.text}</div>
          </div>
          <button type="button" onClick={() => handleLikeAnswer(answer)}>
            <FaHeart
              className={
                answer.likes.find((like) => like === userName) ? 'liked' : ''
              }
            />
            <span>{answer.likes.length}</span>
          </button>
        </div>
      </div>
    </StyledAnswer>
  )
}

export default Answer
