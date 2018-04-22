import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './reset.css'
import './fonts.css'
import './animations.css'

import { Home, PickCharacter, GetReady, Question } from './screens'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/pick_characters' component={PickCharacter} />
      <Route path='/get_ready' component={GetReady} />
      <Route path='/question' component={Question} />
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Router
