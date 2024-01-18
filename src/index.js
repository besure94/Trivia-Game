import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';

function getTrivia(searchType) {
  let request = new XMLHttpRequest();
  let url = "";
  if (searchType === "music") {
    url = `https://opentdb.com/api.php?amount=10&category=12&difficulty=easy`;
  } else if (searchType === "film") {
    url = `https://opentdb.com/api.php?amount=10&category=11&difficulty=easy`;
  } else if (searchType === "tv") {
    url = `https://opentdb.com/api.php?amount=10&category=14&difficulty=easy`;
  } else if (searchType === "geography") {
    url = `https://opentdb.com/api.php?amount=10&category=22&difficulty=easy`;
  } else if (searchType === "history") {
    url = `https://opentdb.com/api.php?amount=10&category=23&difficulty=easy`;
  } else if (searchType === "politics") {
    url = `https://opentdb.com/api.php?amount=10&category=24&difficulty=easy`;
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
  let triviaDiv = document.querySelector("div#showTrivia");
  const trueOrFalse = document.getElementById("trueOrFalse");
  const multipleChoice = document.getElementById("multipleChoice");
  const optionOne = document.getElementById("optionOne");
  const optionTwo = document.getElementById("optionTwo");
  const optionThree = document.getElementById("optionThree");
  const optionFour = document.getElementById("optionFour");
  triviaDiv.innerHTML = response.results[0].question;
  if (response.results[0].type == "boolean") {
    trueOrFalse.removeAttribute("class", "hidden");
    multipleChoice.setAttribute("class", "hidden");
  } else if (response.results[0].type == "multiple") {
    multipleChoice.removeAttribute("class", "hidden");
    document.querySelector(`label[for="optionOne"]`).innerText = response.results[0].correct_answer;
    document.querySelector(`label[for="optionTwo"]`).innerText = response.results[0].incorrect_answers[0];
    document.querySelector(`label[for="optionThree"]`).innerText = response.results[0].incorrect_answers[1];
    document.querySelector(`label[for="optionFour"]`).innerText = response.results[0].incorrect_answers[2];
    optionOne.value = true;
    optionTwo.value = false;
    optionThree.value = false;
    optionFour.value = false;
    trueOrFalse.setAttribute("class", "hidden");
  }
}

function printError(response) {
  console.log(response);
  document.querySelector("#showTrivia").innerHTML = `There was an error accessing trivia:`;
}

window.addEventListener("load", function() {
  document.querySelector('form#triviaQueryForm').addEventListener("submit", function (event) {
    event.preventDefault();
    const radioButtons = document.querySelector("input[name='trivia']:checked").value;
    getTrivia(radioButtons);
    document.querySelector('form#trueFalseAnswerForm').addEventListener("submit", function (e) {
      e.preventDefault();
      const trueOrFalseAnswer = document.querySelector("input[name='userAnswer']:checked").value;
      let trueOrFalseAnswerResult = document.querySelector("p#trueOrFalseAnswerResult");
      if (trueOrFalseAnswer == "true") {
        trueOrFalseAnswerResult.innerText = "Correct!";
      } else {
        trueOrFalseAnswerResult.innerText = "Incorrect!";
      }
      let resetDiv = document.querySelector("div#resetButton");
      resetDiv.removeAttribute("class", "hidden");
      document.querySelector("#clear").addEventListener("click", function() {
        window.location.reload();
      });
    });
    document.querySelector('form#multChoiceAnswerForm').addEventListener("submit", function (evnt) {
      evnt.preventDefault();
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