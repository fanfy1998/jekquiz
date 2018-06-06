import { Question } from './objects'
import { List } from 'immutable'

const load_questions = async (add_question) => {
  await window.gapi_loaded

  let data = await fetch_sheet("1Hvw-qmu5l2zaquIZEfI-wMznuG7hhIoG-bBJCu9_LRo")
  
  for (let i = 1; i < data.result.values.length; ++i) {
    add_question(new Question(data.result.values[i][0], data.result.values[i].slice(1, 4), data.result.values[i][5]));
  }
}

async function fetch_sheet(sheet_id) {
  return window.gapi.client.sheets.spreadsheets.values.get({
    "spreadsheetId": sheet_id,
    "range": "A:F"
  })
}

const pick_questions = (pick_question, questions) => {
  let question_numbers = List()
  for (let i = 0; i < questions.size; i++) {
    question_numbers = question_numbers.push(i)
  }

  for (let i = 0; i < 10 && question_numbers.size !== 0; i++) {    
    let rnd = Math.floor(Math.random() * question_numbers.size)
    let rnd_index = question_numbers.get(rnd)
    question_numbers = question_numbers.remove(rnd)
    pick_question(questions.get(rnd_index))
  }
}

export { load_questions, pick_questions }
