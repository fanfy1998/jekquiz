import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'

import './reset.css'
import './fonts.css'
import './animations.css'

import { 
  GoogleAuthentication, PickCharacter, GetReady, Question, Winner,
  Scores, WaitingWinner, Home
} from './screens'

const store = createStore(reducer)

const Router = () => (
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/pick_characters' component={PickCharacter} />
        <Route path='/get_ready' component={GetReady} />
        <Route path='/question' component={Question} />
        <Route path='/scores' component={Scores} />
        <Route path='/suspense' component={WaitingWinner} />
        <Route path='/winner' component={Winner} />
        <Route path='/home' component={Home} />
        <Route component={GoogleAuthentication} />
      </Switch>
    </BrowserRouter>
  </Provider>
)

export default Router
