import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import './reset.css'
import './fonts.css'
import './animations.css'

import { Home, PickCharacter } from './screens'

const Router = () => (
  <BrowserRouter>
    <Switch>
      <Route path='/pick_characters' component={PickCharacter} />
      <Route component={Home} />
    </Switch>
  </BrowserRouter>
)

export default Router
