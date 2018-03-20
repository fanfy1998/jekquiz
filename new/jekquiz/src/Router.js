import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import './main.css'
import { Home, Characters } from './screens'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/characters' component={Characters} />
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Router
