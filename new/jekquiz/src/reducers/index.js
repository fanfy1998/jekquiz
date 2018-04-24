import { combineReducers } from 'redux'
import { types } from '../actions'
import { List } from 'immutable'

const { ADD_QUESTION } = types

const INITIAL_STATE = {
  questions: List()
}

const question_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, questions: state.questions.push(action.question) }
    default:
      return state
  }
}

export default combineReducers({
  question_reducer
});