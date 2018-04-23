import fs from 'fs'


const load_questions = () => {
  return new Promise(function (resolve, reject) {
    const file_path = __dirname + 'questions.txt'
    console.log(file_path);
    
    let data = fs.readFileSync(file_path)
    //data = data.toString().replace('/ /g', '').split('\n')

    for (let i = 0; i < data.length; i+=6) {
      
    }
  })
}

export { load_questions }