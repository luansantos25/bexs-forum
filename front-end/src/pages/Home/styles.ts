import styled from 'styled-components'

export const Form = styled.form`
  margin-top: 30px;

  textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    border-radius: 10px;
    margin-bottom: 10px;
  }

  button {
    display: block;
    width: 200px;
    height: 40px;
    margin-left: auto;
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

export const Answers = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #404040;
  margin-left: 30px;

  div.answer-item {
    display: flex;
    align-items: center;
    margin-top: 5px;
    padding: 15px 0;
    border-bottom: solid 1px #404040;

    img {
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
      align-self: flex-start;
    }

    button {
      margin-left: auto;
      margin-right: 20px;
      background: transparent;
      border: none;

      svg {
        color: #ccc;
      }

      svg.liked {
        color: rebeccapurple;
      }
    }
  }
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
  }
`
