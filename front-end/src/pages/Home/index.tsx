import React from 'react'

const Home: React.FC = () => {
  const userName = localStorage.getItem('@bexs/userName')
  return <h1>Olá {userName}</h1>
}

export default Home
