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
  console.log(response);
  let triviaDiv = document.querySelector("div#showTrivia");
  const userAnswers = document.getElementById("userAnswers");
  const trueOrFalse = document.getElementById("trueOrFalse");
  const multipleChoice = document.getElementById("multipleChoice");
  const optionOne = document.getElementById("optionOne");
  const optionTwo = document.getElementById("optionTwo");
  const optionThree = document.getElementById("optionThree");
  const optionFour = document.getElementById("optionFour");
  triviaDiv.innerHTML = response.results[0].question;
  if (response.results[0].type == "boolean") {
    userAnswers.removeAttribute("class", "hidden");
    trueOrFalse.removeAttribute("class", "hidden");
    multipleChoice.setAttribute("class", "hidden");
  }
  else if (response.results[0].type == "multiple") {
    userAnswers.removeAttribute("class", "hidden");
    multipleChoice.removeAttribute("class", "hidden");
    document.querySelector(`label[for="optionOne"]`).innerText = response.results[0].correct_answer;
    document.querySelector(`label[for="optionTwo"]`).innerText = response.results[0].incorrect_answers[0];
    document.querySelector(`label[for="optionThree"]`).innerText = response.results[0].incorrect_answers[1];
    document.querySelector(`label[for="optionFour"]`).innerText = response.results[0].incorrect_answers[2];
    optionOne.value = response.results[0].correct_answer;
    optionTwo.value = response.results[0].incorrect_answers[0];
    optionThree.value = response.results[0].incorrect_answers[1];
    optionFour.value = response.results[0].incorrect_answers[2];
    trueOrFalse.setAttribute("class", "hidden");
  }
}

function printError(response) {
  console.log(response);
  document.querySelector("#showTrivia").innerHTML = `There was an error accessing trivia:`;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const radioButtons = document.querySelector("input[name='trivia']:checked").value;
  getTrivia(radioButtons);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});