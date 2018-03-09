const fs = require('fs');
const BuzzController = require('./js/BuzzController.js');
const Question = require('./js/Question.js');

let startScreen, gameScreen, endScreen, pickCharacterScreen, scoreScreen, winnerScreen, winner;
let questions = [];
let npergunta, pergunta, button1, button2, button3, button4, countdown;
let scores = { 'blue': 0, 'orange': 0, 'green': 0, 'yellow': 0}
let count = 0;
let level = 0;
let columns = [1,2,3,4,5,6,7,8,9,10];
let lines = [1,2,3,4];
let characters = { 'blue': null, 'orange': null, 'green': null, 'yellow': null}
let colors = {1: 'blue', 2: 'orange', 3: 'green', 4: 'yellow'}

window.onload = function() {
  npergunta = document.getElementById('npergunta');
  pergunta = document.getElementById('pergunta');
  button1 = document.getElementById('button1');
  button2 = document.getElementById('button2');
  button3 = document.getElementById('button3');
  button4 = document.getElementById('button4');
  countdown = document.getElementById('countdown');
  countdown2 = document.getElementById('countdown2');
  playAgain = document.getElementById('playAgain');
  character = document.getElementById('character');

  pickCharacterScreen = document.getElementById('pickCharacterScreen');
  startScreen = document.getElementById('startScreen');
  gameScreen = document.getElementById('gameScreen');
  endScreen = document.getElementById('endScreen');
  scoreScreen = document.getElementById('scoreScreen');
  prepareScreen = document.getElementById('prepareScreen');
  winnerScreen = document.getElementById('winnerScreen');
  classificationBoard = document.getElementById('classification_board')
  winner = document.getElementById('winner')

  hide(pickCharacterScreen);
  hide(endScreen);
  hide(gameScreen);
  hide(scoreScreen);
  hide(startScreen);
  hide(prepareScreen);
  hide(character);
  hide(winnerScreen);

  loadQuestions();
}

function randInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}

function loadQuestions() {
  nColumns = 7;
  filePath = __dirname + '/perguntas.csv';
  let loadedQuestions = [];

  let data = fs.readFileSync(filePath);

  data = data.toString().replace(/\n|\r/g, "").split(',');

  for (let i=0; i<data.length; i+=6) {
    console.log(data);
    loadedQuestions.push(new Question(data[i], data.slice(i+1, i+nColumns-2), colors[data[i+5]]));
  }

  for (let i = 0; i < 10;++i) {
    let randomIndex = randInt(0, loadedQuestions.length)
    let randomQuestion = loadedQuestions.splice(randomIndex, 1)[0]
    questions.push(randomQuestion)
  }

  show(startScreen);

  let ondata = function(data) {
    let buttonPressed = BuzzController.identify(data);

    if (buttonPressed === undefined) return
    if (buttonPressed.button == "buzz") {
      function buzzi() {
        hide(startScreen)
        show(pickCharacterScreen)

      }
    }
}

function pickCharacters(){
  show(pickCharacterScreen);

  let picked = 0;

  let onerror = function(err) {

  }

  let ondata = function(data) {
    let buttonPressed = BuzzController.identify(data);

    if (buttonPressed === undefined) return
    if (buttonPressed.button == "buzz") return
    if (characters[buttonPressed.button] === buttonPressed.player) return

    if (characters[buttonPressed.button] !== null) {
      console.log(characters);
      console.log("Player " + characters[buttonPressed.button] + " already picked color " + buttonPressed.button)
      return
    }

    if (Object.values(characters).includes(buttonPressed.player)) {
      let oldKey = Object.keys(characters).find(key => characters[key] === buttonPressed.player)

      characters[oldKey] = null;
    } else {
      ++picked
    }

    characters[buttonPressed.button] = buttonPressed.player
    console.log(characters);
    console.log("Color " + buttonPressed.button + " assigned to " + buttonPressed.player);

    if (picked == 4) {
      hide(pickCharacterScreen);
      prepare()
      BuzzController.close()
    }
  }

  BuzzController.data(onerror, ondata)
}

function prepare() {
  let timeout2 = 10;
  let timer;

  show(prepareScreen);

  countdown2.innerText = timeout2;

  timer2 = setTimeout(hit2, 1000);

  function hit2() {
    --timeout2;
    countdown2.innerText = timeout2;
    if (timeout2 == 0) {
      game();
    } else {
      timer2 = setTimeout(hit2, 1000);
    }
  }

}
function game() {
  let question = questions[level];
  console.log(question);
  let timeout = 10;
  let timer;
  let voted = [false, false, false, false];

  hide(prepareScreen);
  show(gameScreen);

  countdown.innerText = timeout;
  npergunta.innerText = level + 1;
  pergunta.innerText = question.question;
  button1.innerText = question.answers[0];
  button2.innerText = question.answers[1];
  button3.innerText = question.answers[2];
  button4.innerText = question.answers[3];

  let onerror = function(err) {

  }

  let ondata = function(data) {
    let buttonPressed = BuzzController.identify(data);

    if (buttonPressed === undefined) return
    if (buttonPressed.button == "buzz") return

    if (!voted[buttonPressed.player]) {
      if (buttonPressed.button == question.correct) {
        let playerColor = Object.keys(characters).find(key => characters[key] === buttonPressed.player)
        scores[playerColor] = scores[playerColor] + 1;
      } else console.log('P' + buttonPressed.player + ' wrong');
      voted[buttonPressed.player] = true;
    }

    let allVoted = voted.reduce(function(acumulator, vote) {
      return acumulator && vote;
    });
  }

  BuzzController.data(onerror, ondata)

  timer = setTimeout(hit, 1000);

  function hit() {
    --timeout;
    countdown.innerText = timeout;
    if (timeout == 0) {
      BuzzController.close()
      nextLevel();
    } else {
      timer = setTimeout(hit, 1000);
    }
  }

  function nextLevel() {
    voted = [false, false, false, false];
    if (level + 1 == questions.length) {
      hide(prepareScreen);
      hide(gameScreen);
      end();
    } else {
      hide(prepareScreen);
      hide(gameScreen);
      showScore();
    }
  }
}

function end(){
  show(endScreen);
  let timeout3 = 5;
  let timer3;

  timer3 = setTimeout(hit3, 1000);

  playAgain.onclick = function() {
    window.location.reload();
  }

  function hit3() {
    --timeout3;
    if (timeout3 == 0) {
      hide(endScreen)
      winner1()
    } else {
      timer3 = setTimeout(hit3, 1000);
    }

    function winner1() {
      let max = Math.max(...Object.values(scores))
      let winnerColor = Object.keys(scores).find(key => scores[key] === max)
      let winnersColors = {'blue':"images/blue.png", 'orange':"images/orange.png", 'green':"images/green.png", 'yellow':"images/yellow.png"}
      winner.src = winnersColors[winnerColor]
      show(winnerScreen)
    }
  }
}

function showScore() {
  show(scoreScreen);

  let result = scoreScreen.getElementsByTagName('h1');
  scoreScreen.onclick = function (){
    console.log('shit' + level);
    ++level;
    hide(scoreScreen);
    game();
  }

  let playerColor = Object.keys(characters).find(key => characters[key] === 0)
  result[0].innerText = 'Player 1: ' + scores[playerColor];
  playerColor = Object.keys(characters).find(key => characters[key] === 1)
  result[1].innerText = 'Player 2: ' + scores[playerColor];
  playerColor = Object.keys(characters).find(key => characters[key] === 2)
  result[2].innerText = 'Player 3: ' + scores[playerColor];
  playerColor = Object.keys(characters).find(key => characters[key] === 3)
  result[3].innerText = 'Player 4: ' + scores[playerColor];
}

function hide(el) {
  el.style.display = "none";
}

function show(el) {
  el.style.display = "block";
}
