import styled from 'styled-components'

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;

  div.login-content {
    width: 768px;
    padding-bottom: 180px;
  }
`

export const Title = styled.h1`
  color: #2c3e50;
  font-size: 30px;
`
export const Form = styled.form`
  display: flex;
  background-color: red;
  height: 60px;
  margin-top: 30px;

  input {
    flex: 1;
    padding: 10px;
    border: solid 1px #ccc;
    border-right: none;
  }

  button {
    width: 200px;
    background-color: #4bde95;
    border: none;
    color: white;
    text-transform: uppercase;

    :disabled {
      opacity: 0.9;
      cursor: not-allowed;
    }
  }
`
