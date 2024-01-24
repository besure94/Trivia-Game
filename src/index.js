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
  console.log(response[0].results);
  const triviaQuestionKeys = response[0].results;
  const randomTriviaQuestion = triviaQuestionKeys[Math.floor(Math.random() * triviaQuestionKeys.length)];
  console.log(randomTriviaQuestion);
  let triviaCardDiv = document.getElementById("triviaCards");
  triviaCardDiv.removeAttribute("class", "hidden");
  triviaCardDiv.innerHTML = randomTriviaQuestion.question;
}

window.addEventListener("load", function() {
  document.querySelector("form#startGame").addEventListener("submit", function (event) {
    event.preventDefault();
    getTriviaQuestions();
  });
});