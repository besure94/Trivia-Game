import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import OpenTriviaApi from './js/openTriviaApi';
import TriviaGame from './js/triviaGame';

// declare global variable for game object to keep track of score
const triviaGameObject = new TriviaGame();
// declare global variable to store API data
let openTriviaApiData = null;

async function getTriviaQuestions() {
  // app gets API call from OpenTriviaApi, and if successful, displays a trivia card where a user can guess an answer
  // if API call is unsuccessful, call printError and display response code to user
  let response = await OpenTriviaApi.getTriviaQuestions();
  openTriviaApiData = response;
  if (response[0].response_code == 0) {
    playTriviaGame();
  } else {
    printError();
  }
}

function printError() {
  document.getElementById("scoreTally").setAttribute("class", "hidden");
  let apiError = document.getElementById("errorResponse");
  if (openTriviaApiData[0].response_code == 1) {
    apiError.innerText = `API Error - Code 1: No results could be returned. The API does not have enough questions for your query.`;
  } else if (openTriviaApiData[0].response_code == 2) {
    apiError.innerText = `API Error - Code 2: Contains an invalid parameter. The arguments passed in are not valid.`;
  } else if (openTriviaApiData[0].response_code == 3) {
    apiError.innerText = `API Error - Code 3: Token not found. Session token does not exist.`;
  } else if (openTriviaApiData[0].response_code == 4) {
    apiError.innerText = `API Error - Code 4: Token empty. Session token has returned all possible questions for the specified query. Reseeting the token is necessary.`;
  } else if (openTriviaApiData[0].response_code == 5) {
    apiError.innerText = `API Error - Code 5: Rate limit exceeded. Too many API requests have occurred. Each IP address can only access the API once every 5 seconds.`;
  }
}

function playTriviaGame() {
  // takes in the question results from the API response and stores them in variable
  const triviaQuestions = openTriviaApiData[0].results;
  // creates method to randomly select a trivia question from the object
  // selected trivia question is stored in variable, and then removed to ensure it will not be asked again
  const randomTriviaIndex = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
  let randomtriviaQuestion = triviaQuestions.splice(randomTriviaIndex, 1)[0];
  // removes hidden DIV and displays trivia question
  let triviaCardDiv = document.getElementById("triviaQuestion");
  triviaCardDiv.removeAttribute("class", "hidden");
  triviaCardDiv.innerHTML = randomtriviaQuestion.question;
  // dynamically creates form with a button to guess the answer
  let form = document.createElement("form");
  form.classList.add("triviaForm");
  let button = document.createElement("button");
  button.classList.add("gameplayButtons");
  button.textContent = "Guess!";
  button.setAttribute("id", "guessAnswer");
  triviaCardDiv.appendChild(form);
  triviaCardDiv.appendChild(button);
  // extracts incorrect answers from their array inside the API response, and combines them with the correct answer in a new array
  const answersArray = randomtriviaQuestion.incorrect_answers.slice();
  answersArray.push(randomtriviaQuestion.correct_answer);
  // shuffles the answers by calling shuffleAnswersArray function, so that their order will be different every time
  shuffleAnswersArray(answersArray);
  // dynamically create radio buttons and append the values of the answersArray to each radio button
  for (let i = 0; i < answersArray.length; i++) {
    let radioButton = document.createElement("input");
    radioButton.type = "radio";
    radioButton.name = "userAnswer";
    radioButton.value = answersArray[i];
    radioButton.classList.add("answerOptions");

    let label = document.createElement("label");
    label.classList.add("answerOptions");
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
    let correctAnswer = randomtriviaQuestion.correct_answer;
    if (guessedAnswer == correctAnswer) {
      // if user guesses correctly, update correct answers tally and display message
      triviaGameObject.correctAnswers += 1;
      answerDiv.innerText = `Correct! Nicely done!`;
    } else if (guessedAnswer != correctAnswer) {
      // if user guesses incorrectly, update incorrect answers tally and display message
      triviaGameObject.incorrectAnswers += 1;
      answerDiv.innerText = `Incorrect! The correct answer is "${correctAnswer}".`;
    }
    // the answer result is appended to the answerDiv
    // the trivia question and answers are then hidden
    // a function that displays the next trivia question is called
    // update the scores in the DOM and keep track of questions remaining
    document.getElementById("scoreTally").removeAttribute("class", "hidden");
    triviaGameObject.questionsRemaining -= 1;
    document.getElementById("correctAnswers").innerText = triviaGameObject.correctAnswers;
    document.getElementById("incorrectAnswers").innerText = triviaGameObject.incorrectAnswers;
    document.getElementById("questionsRemaining").innerText = triviaGameObject.questionsRemaining;
    document.querySelector("div#triviaAnswer").appendChild(answerDiv);
    document.getElementById("triviaQuestion").setAttribute("class", "hidden");
    document.querySelector("div#triviaAnswer").removeAttribute("class", "hidden");
    getNextTriviaQuestion();
    // declares game to be over if no more questions are remaining by calling gameOver function
    // displays the last answer result to user
    let lastAnswerDiv = document.createElement("div");
    lastAnswerDiv.setAttribute("id", "lastAnswer");
    document.querySelector("div#finalAnswerResult").appendChild(lastAnswerDiv);
    if (triviaGameObject.questionsRemaining == 0 && guessedAnswer == correctAnswer) {
      gameOver();
      lastAnswerDiv.innerText = "Your last answer was correct!";
    } else if (triviaGameObject.questionsRemaining == 0 && guessedAnswer != correctAnswer) {
      gameOver();
      lastAnswerDiv.innerText = `Your last answer was incorrect! The correct answer was "${correctAnswer}".`;
    }
  });
}

// this function ends the game, analyzes the users answers, and lets the user officially quit the game
function gameOver() {
  document.getElementById("triviaQuestion").setAttribute("class", "hidden");
  document.getElementById("triviaAnswer").setAttribute("class", "hidden");
  document.getElementById("scoreTally").setAttribute("class", "hidden");
  document.getElementById("gameOver").innerText = "Game Over!";
  calculateScores(triviaGameObject);
  document.getElementById("quitGame").appendChild(document.createElement("br"));
  quitGame();
}

// end the game and refresh the page to play again
function quitGame() {
  let quitButton = document.createElement("button");
  quitButton.classList.add("gameplayButtons");
  quitButton.textContent = "Quit";
  quitButton.setAttribute("id", "quitButton");
  let quitGameDiv = document.getElementById("quitGame");
  quitGameDiv.appendChild(quitButton);
  quitButton.addEventListener("click", function() {
    window.location.reload();
  });
}

// this function calculates the users score and returns their score percentage.
function calculateScores(triviaGameObject) {
  let scoreNumbers = document.getElementById("scoreNumbers");
  let scoreAnalysis = document.getElementById("scoreAnalysis");
  let correctAnswersTotal = triviaGameObject.correctAnswers;
  let incorrectAnswersTotal = triviaGameObject.incorrectAnswers;
  scoreNumbers.innerText = `Correct answers: ${correctAnswersTotal}\n Incorrect answers: ${incorrectAnswersTotal}`;
  let scorePercentage = correctAnswersTotal / triviaGameObject.totalQuestions;
  let finalScorePercentage = (scorePercentage * 100).toFixed(0);
  scoreAnalysis.innerText = `Your score is ${finalScorePercentage}%.`;
}

// shuffles the array of answers so that the order is different every time
function shuffleAnswersArray(answersArray) {
  answersArray.sort(() => Math.random() - 0.5);
}

// retrieves another trivia question for the player
function getNextTriviaQuestion() {
  // creates a new button to get the next question and appends it to the DOM
  let nextQuestionButton = document.createElement("button");
  nextQuestionButton.classList.add("gameplayButtons");
  nextQuestionButton.textContent = "Next Question!";
  nextQuestionButton.setAttribute("id", "nextQuestion");
  document.getElementById("triviaAnswer").appendChild(document.createElement("br"));
  document.getElementById("triviaAnswer").appendChild(nextQuestionButton);
  // when the "Next Question!" button is clicked, the previous trivia answer is hidden.
  // the getTriviaQuestions is called to display a new trivia question, so the user can guess the answer
  nextQuestionButton.addEventListener("click", function() {
    playTriviaGame();
    document.getElementById("triviaAnswer").setAttribute("class", "hidden");
    nextQuestionButton.setAttribute("class", "hidden");
    document.getElementById("triviaQuestion").removeAttribute("class", "hidden");
  });
}

window.addEventListener("load", function() {
  // user clicks "Play!" button, which displays a trivia question by calling getTriviaQuestions, then removes the HTML shown above, and replaces it with new HTML for the game
  document.getElementById("beginGame").addEventListener("click", function () {
    getTriviaQuestions();
    document.getElementById("startGameButton").setAttribute("class", "hidden");
    document.getElementById("gameInstructions").setAttribute("class", "hidden");
    document.getElementById("appHeader").setAttribute("class", "hidden");
  });
});