import styled from 'styled-components'
import { darken } from 'polished'

interface Props {
  asLink?: boolean
}

export const StyledQuestion = styled.div<Props>`
  display: block;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 15px #7070701c;
  font-size: 18px;
  transition: 0.3s;

  &:hover {
    transform: translateX(-3px);
    background-color: ${darken(0.02, '#fff')};
    cursor: ${({asLink}) => asLink ? 'pointer' : 'auto'};
  }

  div.question-content {
    border-bottom: solid 1px #ccc;
    padding: 0 10px 40px;

    span.response-number {
      display: block;
      margin-top: 10px;
      color: #b0b0b0;
      font-size: 12px;
    }

    span.time-ago {
      font-size: 9px;
    }
  }
`

export const AnswerContainer = styled.div`
  position: relative;
  max-height: 40vh;
  overflow: auto;

  ::-webkit-scrollbar {
    width: 3px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #ccc;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
`

export const Response = styled.div`
  margin: 20px 0 0 30px;

  textarea {
    width: 100%;
    min-height: 40px;
    padding: 10px;
    margin-bottom: 5px;
    border: none;
    background-color: transparent;
    border-bottom: solid 1px #ccc;
    resize: none;
  }

  button {
    display: block;
    width: 140px;
    height: 30px;
    margin-left: auto;
    background-color: #ffb957;
    border: none;
    border-radius: 5px;
    color: #fff;

    &:disabled {
      opacity: 0.5;
    }
  }
`
