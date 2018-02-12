const fs = require('fs');
const BuzzController = require('./js/BuzzController.js');

let startScreen, gameScreen, endScreen, pickCharacterScreen, scoreScreen;
let questions = [];
let npergunta, pergunta, button1, button2, button3, button4, countdown;
let scores = [0, 0, 0, 0];
let player1 = 'qwer', player2 = 'uiop', player3 = 'zxcv', player4 = 'jklç';
let voted = [false, false, false, false];
let count = 0;
let level = 0;
let columns = [1,2,3,4,5,6,7,8,9,10];
let lines = [1,2,3,4];

window.onload = function() {
  npergunta = document.getElementById('npergunta');
  pergunta = document.getElementById('pergunta');
  button1 = document.getElementById('button1');
  button2 = document.getElementById('button2');
  button3 = document.getElementById('button3');
  button4 = document.getElementById('button4');
  countdown = document.getElementById('countdown');
  countdown2 = document.getElementById('countdown2');
  winner = document.getElementById('winner');
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

  hide(pickCharacterScreen);
  hide(endScreen);
  hide(gameScreen);
  hide(scoreScreen);
  hide(startScreen);
  hide(prepareScreen);
  hide(playAgain);
  hide(classificationBoard);
  hide(character);

  loadQuestions();
}
function pick(ev) {
  let keypressed = ev.key;
  let isPlayer1 = player1.indexOf(keypressed);
  let isPlayer2 = player2.indexOf(keypressed);
  let isPlayer3 = player3.indexOf(keypressed);
  let isPlayer4 = player4.indexOf(keypressed);
}

function loadQuestions() {

  nColumns = 7;
  filePath = __dirname + '/perguntas.csv';

  let data = fs.readFileSync(filePath);

  data = data.toString().replace(/\n|\r/g, "").split(',');

  for (let i=0; i<data.length; i+=6) {
    questions.push(new Question(data[i], data.slice(i+1, i+nColumns-2), data[i+5]));
  }

  show(startScreen);

  startScreen.getElementsByTagName('button')[0].onclick = function() {
    hide(startScreen);
    pickCharacters();
  }
}

function pickCharacters(){
  const buttons = pickCharacterScreen.getElementsByTagName('button');
  show(pickCharacterScreen);

  for (let i = 0; i < buttons.length; ++i) {
    buttons[i].onclick = function(ev) {
      ev.target.disabled = true;
      console.log(ev.target);
      buttons.indexOf(ev.target)
    }
  }
  buttons[i].onclick = function() {
    hide(pickCharacterScreen);
    prepare();
  }
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
  let timeout = 5;
  let timer;

  hide(prepareScreen);
  show(gameScreen);

  countdown.innerText = timeout;
  npergunta.innerText = level + 1;
  pergunta.innerText = question.question;
  button1.innerText = question.answers[0];
  button2.innerText = question.answers[1];
  button3.innerText = question.answers[2];
  button4.innerText = question.answers[3];

  let select = function(ev) {
    let keypressed = ev.key;
    let isPlayer1 = player1.indexOf(keypressed);
    let isPlayer2 = player2.indexOf(keypressed);
    let isPlayer3 = player3.indexOf(keypressed);
    let isPlayer4 = player4.indexOf(keypressed);

    if (isPlayer1 != -1 && !voted[0]) {
      if (isPlayer1 == question.correct - 1) {

        console.log('P1 correct');
        scores[0] = scores[0] + 1;
      } else console.log('P1 wrong');
      voted[0] = true;
    } else if (isPlayer2 != -1 && !voted[1]) {
      if (isPlayer2 == question.correct - 1) {
        console.log('P2 correct');
        scores[1] = scores[1] + 1;
      } else console.log('P2 wrong');
      voted[1] = true;
    } else if (isPlayer3 != -1 && !voted[2]) {
      if (isPlayer3 == question.correct - 1) {
        console.log('P3 correct');
        scores[2] = scores[2] + 1;
      } else console.log('P3 wrong');
      voted[2] = true;
    } else if (isPlayer4 != -1  && !voted[3]) {
      if (isPlayer4 == question.correct - 1) {
        console.log('P4 correct');
        scores[3] = scores[3] + 1;
      } else console.log('P4 wrong');
      voted[3] = true;
    }

    let allVoted = voted.reduce(function(acumulator, vote) {
      return acumulator && vote;
    });

    if (allVoted) nextLevel();
  }

  window.onkeypress = select;

  timer = setTimeout(hit, 1000);

  function hit() {
    --timeout;
    countdown.innerText = timeout;
    if (timeout == 0) {
      nextLevel();
    } else {
      timer = setTimeout(hit, 1000);
    }
  }

  function nextLevel() {
    voted = [false, false, false, false];
    if (level + 1 == questions.length - 1) {
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
  hide(winnerScreen);
  let timeout3 = 5;
  let timer3;

  timer3 = setTimeout(hit3, 1000);

  playAgain.onclick = function() {
    window.location.reload();
  }

  function hit3() {
    --timeout3;
    if (timeout3 == 0) {
      hide(endScreen);
      show(winnerScreen);
      show(winner);
      show(classificationBoard);
      winner1();
    } else {
      timer3 = setTimeout(hit3, 1000);
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

  result[0].innerText = 'Player 1: ' + scores[0];
  result[1].innerText = 'Player 2: ' + scores[1];
  result[2].innerText = 'Player 3: ' + scores[2];
  result[3].innerText = 'Player 4: ' + scores[3];
}

function winner1(){
  let positions = [];
  let counter = 0;
  let lastMax = -1;
  let scoreBoard = [ ...scores ];

  while (counter < 4) {
    let max = Math.max(...scoreBoard);
    let index = scoreBoard.indexOf(max);
    console.log(max, index, lastMax);
    if (max == lastMax) {
      positions[positions.length-1].push(index);
    } else {
      positions.push([ index+1 ]);
    }

    lastMax = max;

    scoreBoard[index] = -1;
    ++counter;
  }

  console.log(positions);

  winner.innerText = 'Player ' + positions[0][0];
}


function hide(el) {
  el.style.display = "none";
}

function show(el) {
  el.style.display = "block";
}
