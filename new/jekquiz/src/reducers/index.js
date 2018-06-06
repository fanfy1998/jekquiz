import { combineReducers } from 'redux'
import { types } from '../actions'
import { List } from 'immutable'

const { ADD_QUESTION, PICK_QUESTION } = types

const INITIAL_STATE = {
  questions: List(),
  picked_questions: List()
}

const question_reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, questions: state.questions.push(action.question) }
    case PICK_QUESTION:      
      return { ...state, picked_questions: state.picked_questions.push(action.question) }
    default:
      return state
  }
}

export default combineReducers({
  question_reducer
});