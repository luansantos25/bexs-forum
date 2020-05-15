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
`

export const QuestionsContainer = styled.div`
  margin-top: 30px;

  a {
    text-decoration: none;
    color: #000;
  }
`
