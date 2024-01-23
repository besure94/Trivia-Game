import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getTrivia(searchType) {
  let request = new XMLHttpRequest();
  let url = "";
  if (searchType === "music") {
    url = `https://opentdb.com/api.php?amount=50&category=12&difficulty=easy`;
  } else if (searchType === "film") {
    url = `https://opentdb.com/api.php?amount=50&category=11&difficulty=easy`;
  } else if (searchType === "tv") {
    url = `https://opentdb.com/api.php?amount=50&category=14&difficulty=easy`;
  } else if (searchType === "geography") {
    url = `https://opentdb.com/api.php?amount=50&category=22&difficulty=easy`;
  } else if (searchType === "history") {
    url = `https://opentdb.com/api.php?amount=50&category=23&difficulty=easy`;
  }

  request.addEventListener("loadend", function() {
    const response = JSON.parse(this.responseText);
    if (this.status === 200) {
      printTrivia(response);
    } else {
      printError(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printTrivia(response) {
  console.log(response);
  let triviaDiv = document.querySelector("div#showTrivia");
  const trueOrFalse = document.getElementById("trueOrFalse");
  const multipleChoice = document.getElementById("multipleChoice");

  const triviaKeys = response.results;
  const randomTriviaIndex = triviaKeys[Math.floor(Math.random() * triviaKeys.length)];
  console.log(randomTriviaIndex);

  const answersArray = randomTriviaIndex.incorrect_answers.slice();
  answersArray.push(randomTriviaIndex.correct_answer);
  shuffleAnswersArray(answersArray);

  triviaDiv.innerHTML = randomTriviaIndex.question;
  if (randomTriviaIndex.type == "boolean") {
    trueOrFalse.removeAttribute("class", "hidden");
    multipleChoice.setAttribute("class", "hidden");
  } else if (randomTriviaIndex.type == "multiple") {
    multipleChoice.removeAttribute("class", "hidden");
    let labelArray = ["optionOne", "optionTwo", "optionThree", "optionFour"];
    answersArray.forEach(function(element) {
      document.querySelector(`label[for=${labelArray[0]}]`).innerText = element;
      if (element == randomTriviaIndex.correct_answer) {
        document.getElementById(`${labelArray[0]}`).value = true;
      } else {
        document.getElementById(`${labelArray[0]}`).value = element;
      }
      labelArray.shift();
    });
    trueOrFalse.setAttribute("class", "hidden");
  }
}

function shuffleAnswersArray(answersArray) {
  answersArray.sort(() => Math.random() - 0.5);
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
  document.querySelector('form#triviaQueryForm').addEventListener("submit", function (event) {
    event.preventDefault();
    const radioButtons = document.querySelector("input[name='trivia']:checked").value;
    getTrivia(radioButtons);
    document.querySelector('form#trueFalseAnswerForm').addEventListener("submit", function (e) {
      e.preventDefault();
      document.getElementById("submitTrueFalseAnswer").setAttribute("class", "hidden");
      const userAnswer = document.querySelector("input[name='userAnswer']:checked").value;
      let userAnswerResult = document.querySelector("p#trueOrFalseAnswerResult");
      if (userAnswer == "true") {
        userAnswerResult.innerText = "Correct!";
      } else {
        userAnswerResult.innerText = "Incorrect!";
      }
      let resetDiv = document.querySelector("div#resetButton");
      resetDiv.removeAttribute("class", "hidden");
      document.querySelector("#clear").addEventListener("click", function() {
        window.location.reload();
      });
    });
    document.querySelector('form#multChoiceAnswerForm').addEventListener("submit", function (evnt) {
      evnt.preventDefault();
      document.getElementById("submitMultChoiceAnswer").setAttribute("class", "hidden");
      const triviaAnswers = document.querySelector("input[name='multChoiceUserAnswer']:checked").value;
      let answerResultDiv = document.querySelector("p#multChoiceAnswerResult");
      if (triviaAnswers == "true") {
        answerResultDiv.innerText = "Correct!";
      } else {
        answerResultDiv.innerText = "Incorrect!";
      }
      let resetDiv = document.querySelector("div#resetButton");
      resetDiv.removeAttribute("class", "hidden");
      document.querySelector("#clear").addEventListener("click", function() {
        window.location.reload();
      });
    });
  });
});