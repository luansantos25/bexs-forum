import styled from 'styled-components'

export const StyledAnswer = styled.div`
  font-size: 16px;
  color: #404040;
  margin-left: 30px;

  div.answer {
    display: flex;
    width: 100%;
    align-items: center;
    margin-top: 5px;
    padding: 15px 0;

    div.answer-content {
      display: flex;
      width: 100%;
      background: #cccccc2b;
      padding: 10px;
      border-radius: 10px;

      div.answer-text {
        margin-top: 10px;
      }
    }

    img {
      width: 40px;
      border-radius: 50%;
      margin-right: 10px;
      align-self: flex-start;
    }

    button {
      position: relative;
      margin-left: auto;
      margin-right: 20px;
      background: transparent;
      border: none;

      span {
        font-size: 12px;
        color: #707070;
        position: absolute;
        margin-top: -8px;
      }

      svg {
        color: #ccc;
      }

      svg.liked {
        color: rebeccapurple;
      }
    }
  }
`
