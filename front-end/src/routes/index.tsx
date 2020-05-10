import React from 'react'

import {Switch, Route, Link} from 'react-router-dom'

import Login from '../pages/Login'
import Home from '../pages/Home'

const Routes = () => (
  <Switch>
    <Route path="/login" component={Login}/>
    <Route path="/home" component={Home}/>
  </Switch>
  )

export default Routes