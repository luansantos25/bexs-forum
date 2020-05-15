import React, { useState } from 'react'

import { QuestionForm } from './styles'

interface Props {
  handleCreateQuestion: (question: string) => void
}

const MakeQuestion: React.FC<Props> = ({ handleCreateQuestion }: Props) => {
  const [question, setQuestion] = useState('')

  return (
    <QuestionForm>
      <textarea
        placeholder="Type your question"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyPress={(e) => {
          return (
            e.charCode === 13 &&
            question?.length > 5 &&
            (handleCreateQuestion(question), setQuestion(''))
          )
        }}
      />
      <button
        type="submit"
        onClick={() => {
          handleCreateQuestion(question)
          setQuestion('')
        }}
        disabled={!(question?.length > 5)}
      >
        Send
      </button>
    </QuestionForm>
  )
}

export default MakeQuestion
