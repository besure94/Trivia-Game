import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import OpenTriviaApi from './js/openTriviaApi';

async function getTriviaQuestions() {
  let response = await OpenTriviaApi.getTriviaQuestions();
  if (response[0].response_code == 0) {
    populateTriviaCards(response);
  }
}

function populateTriviaCards(response) {
  const triviaQuestionKeys = response[0].results;
  const randomTriviaQuestion = triviaQuestionKeys[Math.floor(Math.random() * triviaQuestionKeys.length)];
  let triviaCardDiv = document.getElementById("triviaCards");
  triviaCardDiv.removeAttribute("class", "hidden");
  triviaCardDiv.innerHTML = randomTriviaQuestion.question;

  const answersArray = randomTriviaQuestion.incorrect_answers.slice();
  answersArray.push(randomTriviaQuestion.correct_answer);
  shuffleAnswersArray(answersArray);
}

function shuffleAnswersArray(answersArray) {
  answersArray.sort(() => Math.random() - 0.5);
}

window.addEventListener("load", function() {
  document.querySelector("form#startGame").addEventListener("submit", function (event) {
    event.preventDefault();
    getTriviaQuestions();
  });
});