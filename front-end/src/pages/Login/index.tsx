import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Title, Form, Container } from './styles'

const Login: React.FC = () => {
  const [userName, setUserName] = useState('')

  const history = useHistory()

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    localStorage.setItem('@bexs/userName', userName)

    history.push('/home')
  }

  return (
    <Container>
      <div className="login-content">
        <Title>Login</Title>
        <Form onSubmit={handleSubmit}>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
          />
          <button type="submit">SignIn</button>
        </Form>
      </div>
    </Container>
  )
}

export default Login
