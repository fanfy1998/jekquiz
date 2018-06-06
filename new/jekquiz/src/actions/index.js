export const types = {
  ADD_QUESTION: 'ADD_QUESTION',
  PICK_QUESTION: 'PICK_QUESTION'
}

const add_question = question => ({
  type: types.ADD_QUESTION,
  question
})

const pick_question = question => ({
  type: types.PICK_QUESTION,
  question
})

const actions = {
  add_question,
  pick_question
}

export default actions