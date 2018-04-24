import { Question } from './objects'

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

export { load_questions }
