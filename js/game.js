const fs = require('fs');

let startScreen, gameScreen, endScreen, pickCharacterScreen, scoreScreen;
let questions = [];
let npergunta, categoria, pergunta, button1, button2, button3, button4, countdown;
let scores = [0, 0, 0, 0];
let player1 = 'qwer', player2 = 'uiop', player3 = 'zxcv', player4 = 'jklç';
let voted = [false, false, false, false];
let count = 0;
let level = 0;

window.onload = function() {
  npergunta = document.getElementById('npergunta');
  categoria = document.getElementById('categoria');
  pergunta = document.getElementById('pergunta');
  button1 = document.getElementById('button1');
  button2 = document.getElementById('button2');
  button3 = document.getElementById('button3');
  button4 = document.getElementById('button4');
  countdown = document.getElementById('countdown');

  pickCharacterScreen = document.getElementById('pickCharacterScreen');
  startScreen = document.getElementById('startScreen');
  gameScreen = document.getElementById('gameScreen');
  endScreen = document.getElementById('endScreen');
  scoreScreen = document.getElementById('scoreScreen');

  hide(pickCharacterScreen);
  hide(endScreen);
  hide(gameScreen);
  hide(scoreScreen);
  hide(startScreen);

  loadQuestions();
}

function loadQuestions() {

  nColumns = 7;
  filePath = __dirname + '/perguntas1.csv';


  fs.readFile(filePath, function(err, data) {
    if (err) {
      throw err;
    }

    data = data.toString().replace(/\n|\r/g, "").split(',');


    for (let i=0; i<data.length; i+=7) {
      questions.push(new Question(data[i], data[i+1], data.slice(i+2, i+nColumns-1), data[i+nColumns-1]));
    }

    start();
  });
}

function start() {
  show(startScreen);

  startScreen.getElementsByTagName('button')[0].onclick = function() {
    hide(startScreen);
    pickCharacters();
  }
}

function pickCharacters(){
  const buttons = pickCharacterScreen.getElementsByTagName('button');
  let i = 0;

  show(pickCharacterScreen);

  for (; i < buttons.length - 1; ++i) {
    buttons[i].onclick = function(ev) {
        ev.target.disabled = true;
        console.log(ev.target);
    }
  }

  buttons[i].onclick = function() {
    hide(pickCharacterScreen);
    game();
  }
}

function game() {
  let question = questions[level];
  let timeout = 10;
  let timer;

  show(gameScreen);

  countdown.innerText = timeout;
  npergunta.innerText = level + 1;
  categoria.innerText = question.category;
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
      end();
    } else {
      hide(gameScreen);
      showScore();
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

function hide(el) {
  el.style.display = "none";
}

function show(el) {
  el.style.display = "block";
}
