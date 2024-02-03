import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import OpenTriviaApi from './js/openTriviaApi';
import TriviaGame from './js/triviaGame';

// declare game object to keep track of score
const triviaGameObject = new TriviaGame();

async function getTriviaQuestions() {
  // app gets API call from OpenTriviaApi, and if successful, displays a trivia card where a user can guess an answer
  let response = await OpenTriviaApi.getTriviaQuestions();
  if (response[0].response_code == 0) {
    createTriviaCardAndGuessAnswers(response);
  }
}

function createTriviaCardAndGuessAnswers(response) {
  // takes in the question results from the API response and stores them in variable
  const triviaQuestionKeys = response[0].results;
  // creates method to shuffle the trivia questions and store them in variable
  const randomTriviaQuestion = triviaQuestionKeys[Math.floor(Math.random() * triviaQuestionKeys.length)];
  // removes hidden DIV and displays trivia question
  let triviaCardDiv = document.getElementById("triviaCards");
  triviaCardDiv.removeAttribute("class", "hidden");
  triviaCardDiv.innerHTML = randomTriviaQuestion.question;
  // dynamically creates form with a button to guess the answer
  let form = document.createElement("form");
  form.appendChild(document.createElement("br"));
  let button = document.createElement("button");
  button.textContent = "Guess!";
  button.setAttribute("id", "guessAnswer");
  triviaCardDiv.appendChild(form);
  triviaCardDiv.appendChild(document.createElement("br"));
  triviaCardDiv.appendChild(button);

  // extracts incorrect answers from their array, and combines them with the correct answer in a new array
  const answersArray = randomTriviaQuestion.incorrect_answers.slice();
  answersArray.push(randomTriviaQuestion.correct_answer);
  // shuffles the answers by calling shuffelAnswersArray function, so that their order will be different every time
  shuffleAnswersArray(answersArray);

  // dynamically create radio buttons and append the values of the answersArray to each radio button
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

  // user clicks "Guess!" button
  // answer is then evaluated, and displays a message stating whether it is correct or incorrect
  button.addEventListener("click", function() {
    let guessedAnswer = document.querySelector('input[name="userAnswer"]:checked').value;
    document.querySelector("div#triviaAnswer").innerText = "";
    let answerDiv = document.createElement("div");
    answerDiv.setAttribute("id", "result");
    let correctAnswer = randomTriviaQuestion.correct_answer;
    if (guessedAnswer == randomTriviaQuestion.correct_answer) {
      // if user guesses correctly, update correct answers tally //
      triviaGameObject.correctAnswers += 1;
      answerDiv.innerText = `Correct! Nicely done!`;
    } else if (guessedAnswer != randomTriviaQuestion.correct_answer) {
      // if user guesses incorrectly, update incorrect answers tally
      triviaGameObject.incorrectAnswers += 1;
      answerDiv.innerText = `Incorrect! The correct answer is ${correctAnswer}.`;
    } else {
      answerDiv.innerText = `Please select an answer!`;
    }
    // the answer result is appended to the answerDiv
    // the trivia card is then hidden
    // a function that displays the next trivia question is called
    // update the scores in the DOM and keep track of questions remaining
    triviaGameObject.questionsRemaining -= 1;
    document.getElementById("correctAnswers").innerText = triviaGameObject.correctAnswers;
    document.getElementById("incorrectAnswers").innerText = triviaGameObject.incorrectAnswers;
    document.getElementById("questionsRemaining").innerText = triviaGameObject.questionsRemaining;
    document.querySelector("div#triviaAnswer").appendChild(answerDiv);
    document.getElementById("triviaCards").setAttribute("class", "hidden");
    document.querySelector("div#triviaAnswer").removeAttribute("class", "hidden");
    getNextTriviaQuestion();

    if (triviaGameObject.questionsRemaining == 0) {
      gameOver();
    }
  });
}

// declare game to be over if no more questions are remaining
function gameOver() {
  if (triviaGameObject.questionsRemaining == 0) {
    document.getElementById("triviaCards").setAttribute("class", "hidden");
    document.getElementById("triviaAnswer").setAttribute("class", "hidden");
    document.getElementById("scoreTally").setAttribute("class", "hidden");
    document.getElementById("gameOver").innerText = "Game Over!";
  }
}

// shuffles the array of answers so that the order is different every time
function shuffleAnswersArray(answersArray) {
  answersArray.sort(() => Math.random() - 0.5);
}

function getNextTriviaQuestion() {
  // creates a new button to get the next question and appends it to the DOM
  let nextQuestionButton = document.createElement("button");
  nextQuestionButton.textContent = "Next Question!";
  nextQuestionButton.setAttribute("id", "nextQuestion");
  document.getElementById("triviaAnswer").appendChild(document.createElement("br"));
  document.getElementById("triviaAnswer").appendChild(nextQuestionButton);

  // when the "Next Question!" button is clicked, the previous trivia answer is hidden.
  // the getTriviaQuestions is called to display a new trivia card, so the user can guess the answer
  nextQuestionButton.addEventListener("click", function() {
    getTriviaQuestions();
    document.getElementById("triviaAnswer").setAttribute("class", "hidden");
    nextQuestionButton.setAttribute("class", "hidden");
    document.getElementById("triviaCards").removeAttribute("class", "hidden");
  });
}

window.addEventListener("load", function() {
  // user clicks "Begin!" button, which displays a trivia question by calling getTriviaQuestions, and then removes the button to be more user friendly
  document.querySelector("form#startGame").addEventListener("submit", function (event) {
    event.preventDefault();
    getTriviaQuestions();
    document.getElementById("beginGame").setAttribute("class", "hidden");
    document.getElementById("gameInstructions").setAttribute("class", "hidden");
    document.getElementById("scoreTally").removeAttribute("class", "hidden");
  });
});