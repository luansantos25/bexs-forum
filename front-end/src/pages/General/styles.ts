import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  max-width: 668px;
  margin: 0 auto;
  padding: 40px 20px;

  div.top-content {
    background-color: #fff;
    box-shadow: 0px 4px 15px #7070701c;
    border-radius: 10px;
    padding: 40px 20px;
    transition: 0.5s;

    &:hover {
      background-color: ${darken(0.02, '#fff')};
    }

    h1 {
      color: #4bde95;
    }
  }

  h1 {
    color: #4bde95;
  }
`

export const QuestionsContainer = styled.div`
  margin-top: 30px;
`

export const Question = styled.a`
  display: block;
  background-color: #fff;
  border-radius: 10px;
  margin-bottom: 20px;
  padding: 20px;
  box-shadow: 2px 2px 2px #000;
  font-size: 18px;
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
