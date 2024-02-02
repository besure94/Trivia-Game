export default class TriviaGame {
  constructor() {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.numberOfAnswersAllowed = 20;
    this.rightAnswer = false;
    this.falseAnswer = false;
  }

  updateAnswersTally() {
    if (this.rightAnswer == true) {
      this.correctAnswers += 1;
    } else if (this.falseAnswer == true) {
      this.incorrectAnswers += 1;
    }
    this.numberOfAnswersAllowed -= 1;
  }
}