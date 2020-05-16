import React from 'react'

import { Switch, Route, useLocation } from 'react-router-dom'

import Header from '../components/Header'
import Login from '../pages/Login'
import Home from '../pages/Home'
import QuestionDetails from '../pages/QuestionDetails'
import General from '../pages/General'

const Routes: React.FC = () => {

  const location = useLocation()

  return (
    <>
    {
      location.pathname !== '/' && <Header></Header>
    }
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/question/:id" component={QuestionDetails} />
        <Route path="/general" component={General} />
      </Switch>
    </>
  )
}

export default Routes
