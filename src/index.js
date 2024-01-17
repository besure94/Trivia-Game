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
      printElements(response);
    } else {
      printError(response);
    }
  });

  request.open("GET", url, true);
  request.send();
}

function printElements(response) {
  console.log(response);
  let triviaDiv = document.querySelector("div#showTrivia");
  const userAnswers = document.getElementById("userAnswers");
  const trueOrFalse = document.getElementById("trueOrFalse");
  const answerBox = document.getElementById("answerBox");
  triviaDiv.innerHTML = response.results[0].question;
  if (response.results[0].type == "boolean") {
    userAnswers.removeAttribute("class", "hidden");
    trueOrFalse.removeAttribute("class", "hidden");
    answerBox.setAttribute("class", "hidden");
  }
  else if (response.results[0].type == "multiple") {
    userAnswers.removeAttribute("class", "hidden");
    answerBox.removeAttribute("class", "hidden");
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