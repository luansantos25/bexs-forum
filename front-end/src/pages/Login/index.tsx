import React, { useState, FormEvent } from 'react'
import { useHistory } from 'react-router-dom'
import { Title, Form, Container } from './styles'

const Login: React.FC = () => {
  const [userName, setUserName] = useState('')

  const history = useHistory()

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault()
    localStorage.setItem('@bexs/username', userName.replace(/\s/g, ''))

    history.push('/home')
  }

  return (
    <Container>
      <div className="login-content">
        <Title>BEXS</Title>
        <Form onSubmit={handleSubmit}>
          <input
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="username"
          />
          <button type="submit" disabled={!(userName?.length >= 2)}>
            SignIn
          </button>
        </Form>
      </div>
    </Container>
  )
}

export default Login
