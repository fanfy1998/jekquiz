export const types = {
  ADD_QUESTION: 'ADD_QUESTION'
}

const add_question = question => ({
  type: types.ADD_QUESTION,
  question
})

const actions = {
  add_question
}

export default actions