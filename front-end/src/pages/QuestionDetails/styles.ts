import styled from 'styled-components'

export const Container = styled.div`
  max-width: 668px;
  margin: 0 auto;
  padding: 40px 20px;

  h1 {
    color: #4bde95;
  }

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    color: #777;

    svg {
      margin-right: 5px;
    }
  }
`

export const QuestionsContainer = styled.div`
  margin-top: 30px;
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
