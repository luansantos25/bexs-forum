import styled from 'styled-components'
import { darken } from 'polished'

export const StyledQuestion = styled.div`
  display: block;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 0px 2px 15px #7070701c;
  font-size: 18px;
  transition: 0.3s;

  &:hover {
    transform: translateX(-1px);
    background-color: ${darken(0.02, '#fff')};
    cursor: pointer;
  }

  div.question-content {
    border-bottom: solid 1px #ccc;
    padding: 0 10px 40px;

    span {
      display: block;
      margin-top: 10px;
      color: #b0b0b0;
      font-size: 14px;
    }
  }
`

export const AnswerContainer = styled.div`
  position: relative;
`

export const Response = styled.div`
  margin: 20px 0 0 30px;

  textarea {
    width: 100%;
    min-height: 40px;
    padding: 10px;
    margin-bottom: 5px;
    border: none;
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
  }
`
