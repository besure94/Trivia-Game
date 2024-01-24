import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import OpenTriviaApi from './js/openTriviaApi';

async function getTriviaQuestions() {
  let response = await OpenTriviaApi.getTriviaQuestions();
  if (response[0].response_code == 0) {
    // printTrivia(response);
    populateTriviaCards(response);
  } else {
    printError(response);
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

function printError(response) {
  console.log(response);
  if (response.response_code == 5) {
    document.querySelector("#showTrivia").innerHTML = `There was an error accessing trivia: Too many requests have occurred. Each IP can only access the API once every 5 seconds.`;
    document.getElementById("trueOrFalse").setAttribute("class", "hidden");
    document.getElementById("multipleChoice").setAttribute("class", "hidden");
  }
}

window.addEventListener("load", function() {
  document.querySelector("form#startGame").addEventListener("submit", function (event) {
    event.preventDefault();
    getTriviaQuestions();
  });
});