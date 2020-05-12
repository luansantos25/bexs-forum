import React from 'react'

import { Switch, Route } from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'
import QuestionDetails from '../pages/QuestionDetails'
import General from '../pages/General'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/question/:id" component={QuestionDetails} />
    <Route path="/general" component={General} />
  </Switch>
)

export default Routes
