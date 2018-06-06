export class Question {
  constructor(question, answers, correct) {
    this.question = question;
    this.answers = answers;
    this.correct = correct;
  }
}

class BuzzBell {
  constructor(buzz, blue, orange, green, yellow) {
    this.buzz = buzz;
    this.blue = blue;
    this.orange = orange;
    this.green = green;
    this.yellow = yellow;

    this.codename = {}
    this.codename[buzz] = "buzz"
    this.codename[blue] = "blue"
    this.codename[orange] = "orange"
    this.codename[green] = "green"
    this.codename[yellow] = "yellow"
  }
}