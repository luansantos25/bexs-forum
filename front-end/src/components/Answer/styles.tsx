import styled from 'styled-components'

export const StyledAnswer = styled.div`
  margin-top: 20px;
  font-size: 16px;
  color: #404040;
  margin-left: 30px;

  div.answer-item {
    display: flex;
    align-items: center;
    margin-top: 5px;
    padding: 15px 0;
    border-bottom: solid 1px #4bde95;

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
