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
  let response = await OpenTriviaApi.getTriviaQuestions();
  if (response[0].response_code == 0) {
    openTriviaApiData = response;
    playTriviaGame();
  }
}

function playTriviaGame() {
  // takes in the question results from the API response and stores them in variable
  const triviaQuestions = openTriviaApiData[0].results;
  // creates method to shuffle the trivia questions and store them in variable
  const randomTriviaQuestion = triviaQuestions[Math.floor(Math.random() * triviaQuestions.length)];
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

  // extracts incorrect answers from their array inside the API response, and combines them with the correct answer in a new array
  const answersArray = randomTriviaQuestion.incorrect_answers.slice();
  answersArray.push(randomTriviaQuestion.correct_answer);
  // shuffles the answers by calling shuffleAnswersArray function, so that their order will be different every time
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
    if (guessedAnswer == correctAnswer) {
      // if user guesses correctly, update correct answers tally and display message
      triviaGameObject.correctAnswers += 1;
      answerDiv.innerText = `Correct! Nicely done!`;
    } else if (guessedAnswer != correctAnswer) {
      // if user guesses incorrectly, update incorrect answers tally and display message
      triviaGameObject.incorrectAnswers += 1;
      answerDiv.innerText = `Incorrect! The correct answer is ${correctAnswer}.`;
      // ** Fix this logic in condition ** //
    } else {
      answerDiv.innerText = `Please select an answer!`;
    }
    // the answer result is appended to the answerDiv
    // the trivia question and answers are then hidden
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
      lastAnswerDiv.innerText = `Your last answer was incorrect! The correct answer was ${correctAnswer}.`;
    }
  });
}

// this function ends the game, analyzes the users answers, and lets the user officially quit the game
function gameOver() {
  document.getElementById("triviaCards").setAttribute("class", "hidden");
  document.getElementById("triviaAnswer").setAttribute("class", "hidden");
  document.getElementById("scoreTally").setAttribute("class", "hidden");
  document.getElementById("gameOver").innerText = "Game Over! Thanks for playing!";
  analyzeScores(triviaGameObject);
  document.getElementById("quitGame").appendChild(document.createElement("br"));
  quitGame();
}

// end the game and refresh the page to play again
function quitGame() {
  let quitButton = document.createElement("button");
  quitButton.textContent = "Quit";
  quitButton.setAttribute("id", "quitButton");
  let quitGameDiv = document.getElementById("quitGame");
  quitGameDiv.appendChild(quitButton);
  quitButton.addEventListener("click", function() {
    window.location.reload();
  });
}

// this function analyzes the users answer results and displays a different message depending on how well they did
function analyzeScores(triviaGameObject) {
  let scoreNumbers = document.getElementById("scoreNumbers");
  let scoreAnalysis = document.getElementById("scoreAnalysis");
  let correctAnswersTotal = triviaGameObject.correctAnswers;
  let incorrectAnswersTotal = triviaGameObject.incorrectAnswers;
  scoreNumbers.innerText = `Correct answers: ${correctAnswersTotal}\n Incorrect answers: ${incorrectAnswersTotal}`;

  if (correctAnswersTotal > incorrectAnswersTotal) {
    scoreAnalysis.innerText = "You got more answers right than you did wrong! Nice work!";
  } else if (correctAnswersTotal == incorrectAnswersTotal) {
    scoreAnalysis.innerText = "You got an equal number of right and wrong answers! Not bad!";
  } else if (correctAnswersTotal < incorrectAnswersTotal) {
    scoreAnalysis.innerText = "You got more answers wrong than you did right! Better luck next time!";
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
  // the getTriviaQuestions is called to display a new trivia question, so the user can guess the answer
  nextQuestionButton.addEventListener("click", function() {
    playTriviaGame();
    document.getElementById("triviaAnswer").setAttribute("class", "hidden");
    nextQuestionButton.setAttribute("class", "hidden");
    document.getElementById("triviaCards").removeAttribute("class", "hidden");
  });
}

window.addEventListener("load", function() {
  // user clicks "Play!" button, which displays a trivia question by calling getTriviaQuestions, then removes the HTML shown above, and replaces it with new HTML for the game
  document.querySelector("form#startGame").addEventListener("submit", function (event) {
    event.preventDefault();
    getTriviaQuestions();
    document.getElementById("beginGame").setAttribute("class", "hidden");
    document.getElementById("gameInstructions").setAttribute("class", "hidden");
    document.getElementById("scoreTally").removeAttribute("class", "hidden");
    document.getElementById("appHeader").setAttribute("class", "hidden");
  });
});