import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import OpenTriviaApi from './js/openTriviaApi';

async function getTriviaQuestions() {
  let response = await OpenTriviaApi.getTriviaQuestions();
  if (response[0].response_code == 0) {
    createTriviaCardAndGuessAnswer(response);
  }
}

function createTriviaCardAndGuessAnswer(response) {
  const triviaQuestionKeys = response[0].results;
  const randomTriviaQuestion = triviaQuestionKeys[Math.floor(Math.random() * triviaQuestionKeys.length)];
  let triviaCardDiv = document.getElementById("triviaCards");
  triviaCardDiv.removeAttribute("class", "hidden");
  triviaCardDiv.innerHTML = randomTriviaQuestion.question;
  let form = document.createElement("form");
  form.appendChild(document.createElement("br"));
  let button = document.createElement("button");
  button.textContent = "Guess!";
  button.setAttribute("id", "guessAnswer");
  triviaCardDiv.appendChild(form);
  triviaCardDiv.appendChild(document.createElement("br"));
  triviaCardDiv.appendChild(button);

  const answersArray = randomTriviaQuestion.incorrect_answers.slice();
  answersArray.push(randomTriviaQuestion.correct_answer);
  shuffleAnswersArray(answersArray);

  for (let i = 0; i < answersArray.length; i++) {
    let radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "userAnswer";
    radioButton.value = answersArray[i];

    let label = document.createElement("label");
    label.appendChild(document.createTextNode(answersArray[i]));

    form.appendChild(radioButton);
    form.appendChild(label);
    form.appendChild(document.createElement("br"));
  }

  button.addEventListener("click", function() {
    let guessedAnswer = document.querySelector('input[name="userAnswer"]:checked').value;
    document.querySelector("div#triviaAnswer").innerText = "";
    let answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "result");
    let correctAnswer = randomTriviaQuestion.correct_answer;
    if (guessedAnswer == randomTriviaQuestion.correct_answer) {
      answerDiv.innerText = `Correct! Nicely done!`;
    } else if (guessedAnswer != randomTriviaQuestion.correct_answer) {
      answerDiv.innerText = `Incorrect! The correct answer is ${correctAnswer}.`;
    } else if (guessedAnswer == null) {
      answerDiv.innerText = `Please select an answer!`;
    }
    document.querySelector("div#triviaAnswer").appendChild(answerDiv);
    document.getElementById("triviaCards").setAttribute("class", "hidden");
  });
}

function shuffleAnswersArray(answersArray) {
  answersArray.sort(() => Math.random() - 0.5);
}

window.addEventListener("load", function() {
  document.querySelector("form#startGame").addEventListener("submit", function (event) {
    event.preventDefault();
    getTriviaQuestions();
    document.getElementById("beginGame").setAttribute("class", "hidden");
  });
});