import { combineReducers } from 'redux'
import { types } from '../actions'

const { ADD_QUESTION } = types

const question_reducer = (state = {}, action) => {
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