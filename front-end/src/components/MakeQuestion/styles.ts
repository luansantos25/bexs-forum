import styled from 'styled-components'

export const QuestionForm = styled.div`
  margin-top: 30px;

  textarea {
    width: 100%;
    min-height: 60px;
    padding: 10px;
    margin-bottom: 10px;
    border: none;
    border-bottom: 1px solid #eee;
    resize: none;
    background-color: transparent;
  }

  small {
    display: flex;
    align-items: center;
    font-size: 10px;
    color: #ccc;

    svg {
      margin-left: 3px;
      font-size: 12px;
    }
  }

  button {
    display: block;
    width: 200px;
    height: 40px;
    margin-left: auto;
    background-color: #ffb957;
    border: none;
    border-radius: 5px;
    color: #fff;

    :disabled {
      opacity: 0.5;
    }
  }
`
