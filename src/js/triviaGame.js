// this object stores the data for the game
export default class TriviaGame {
  constructor() {
    this.correctAnswers = 0;
    this.incorrectAnswers = 0;
    this.questionsRemaining = 10;
    this.totalQuestions = 10;
  }
}