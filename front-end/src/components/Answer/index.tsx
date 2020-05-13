import React from 'react'

import { FaHeart } from 'react-icons/fa'

import { StyledAnswer } from './styles'

import { Answer as AnswerTypes } from '../../types'

interface Props {
  userName: string
  answer: AnswerTypes
  handleLikeAnswer(answer: AnswerTypes): void
}

const Answer: React.FC<Props> = ({
  userName,
  answer,
  handleLikeAnswer,
}: Props) => {
  return (
    <StyledAnswer>
      <div className="answer">
        <img
          src="https://api.adorable.io/avatars/285/abott@adorable.png"
          alt="User Avatar"
        />
        <div className="answer-content">
          <div className="answer-data">
            <strong>{answer.username}</strong>
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
