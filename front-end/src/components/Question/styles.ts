import styled from 'styled-components'

export const StyledQuestion = styled.div`
  display: block;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 2px 2px 2px #000;
  font-size: 18px;

  div.question-content {
    span {
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
    border-radius: 10px;
    min-height: 40px;
    padding: 5px;
    margin-bottom: 5px;
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
