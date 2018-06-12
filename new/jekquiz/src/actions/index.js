export const types = {
  ADD_QUESTION: 'ADD_QUESTION',
  PICK_QUESTION: 'PICK_QUESTION',
  PICK_TEAM_COLOR: 'PICK_TEAM_COLOR',
  NEXT_QUESTION: 'NEXT_QUESTION',
  ANSWER_QUESTION: 'ANSWER_QUESTION'
}

const add_question = question => ({
  type: types.ADD_QUESTION,
  question
})

const pick_question = question => ({
  type: types.PICK_QUESTION,
  question
})

const pick_team_color = (team, color) => ({
  type: types.PICK_TEAM_COLOR,
  team,
  color
})

const next_question = () => ({
  type: types.NEXT_QUESTION
})

const answer_question = (team, answer) => ({
  type: types.ANSWER_QUESTION,
  team,
  answer
})

const actions = {
  add_question,
  pick_question,
  pick_team_color,
  next_question,
  answer_question
}

export default actions