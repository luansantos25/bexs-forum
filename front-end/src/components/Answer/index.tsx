import React from 'react'

import { FaHeart } from 'react-icons/fa'

import { StyledAnswer } from './styles'

interface AnswerTypes {
  id: string
  text: string
  user: string
  creationDate: string
  likes: string[]
}

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
      <div className="answer-item">
        <img
          src="https://api.adorable.io/avatars/285/abott@adorable.png"
          alt="User Avatar"
        />
        <div className="answer-data">
          <strong>{answer.user}</strong>
          <div className="answer-text">{answer.text}</div>
        </div>
        <button type="button" onClick={() => handleLikeAnswer(answer)}>
          <FaHeart
            className={
              answer.likes.find((like) => like === userName) ? 'liked' : ''
            }
          />
          {answer.likes.length}
        </button>
      </div>
    </StyledAnswer>
  )
}

export default Answer
