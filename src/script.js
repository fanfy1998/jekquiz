var certo=0;
var errado=0;

window.onload = function() {

  var corretButtons = document.getElementsByClassName('certo');
  var buttonsCollection = document.getElementsByClassName('errado');
  var buttons = [];

  for (var i; i<buttonsCollection.length; ++i) {
    buttons.push(buttonsCollection[i]);
    buttonsCollection[i].innerText = questions[i];
    buttonsCollection[i].onclick = click;
  }

  function click(ev) {
    console.log('hi');
    if (certo == buttons.indexOf(ev.target)) {
      console.log("certo");
      ++certas;
    } else {
      ++erradas;
    }
  }
};
