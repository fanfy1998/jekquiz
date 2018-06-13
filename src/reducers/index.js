import { combineReducers } from 'redux'
import { types } from '../actions'
import { List } from 'immutable'

const { ADD_QUESTION, PICK_QUESTION, PICK_TEAM_COLOR, NEXT_QUESTION, ANSWER_QUESTION, RESET_STATE } = types

const INITIAL_STATE = {
  questions: List(),
  picked_questions: List(),
  current_question: 0,
  team_colors: List([undefined, undefined, undefined, undefined]),
  scores: List()
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_QUESTION:
      return { ...state, questions: state.questions.push(action.question) }

    case PICK_QUESTION:      
      return { ...state, picked_questions: state.picked_questions.push(action.question) }

    case NEXT_QUESTION:
      return { ...state, current_question: state.current_question + 1 }

    case ANSWER_QUESTION:
      const question = state.picked_questions.get(state.current_question)
      let score = state.scores.get(action.team)
      if (score === undefined) score = 0
      let scores = state.scores

      if (question.correct === action.answer) {
        score += 1
      }

      return { ...state, scores: scores.set(action.team, score) }

    case PICK_TEAM_COLOR:
      return { ...state, team_colors: state.team_colors.set(action.team, action.color) }

    case RESET_STATE:
      console.log(INITIAL_STATE)
      return { ...INITIAL_STATE,...INITIAL_STATE
    }

    default:
      return state
  }
}

export default combineReducers({ reducer });