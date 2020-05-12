import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'
import { Header as StyledHeader } from './styles'

const Header: React.FC = () => {
  const [username, setUsername] = useState('')

  useEffect(() => {
    setUsername(localStorage.getItem('@bexs/userName') ?? '')
  }, [])

  return (
    <StyledHeader>
      <div className="header-content">
        <div className="brand">
          <a href="test">Bexs</a>
        </div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/general">General</Link>
            </li>
          </ul>
          <div className="user">
            <img
              src="https://api.adorable.io/avatars/285/abott@adorable.png"
              alt=""
            />
            <div className="user-data">
              <strong>{username}</strong>
              <Link to="/">Logout</Link>
            </div>
          </div>
        </nav>
      </div>
    </StyledHeader>
  )
}

export default Header
