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
  const trueOrFalse = document.getElementById("trueOrFalse");
  const multipleChoice = document.getElementById("multipleChoice");
  const optionOne = document.getElementById("optionOne");
  const optionTwo = document.getElementById("optionTwo");
  const optionThree = document.getElementById("optionThree");
  const optionFour = document.getElementById("optionFour");
  console.log(response.results[0]);
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

function handleTriviaFormSubmission(event) {
  event.preventDefault();
  const radioButtons = document.querySelector("input[name='trivia']:checked").value;
  getTrivia(radioButtons);
}

function handleMultChoiceAnswerFormSubmission(event) {
  event.preventDefault();
  const triviaAnswers = document.querySelector("input[name='multChoiceUserAnswer']:checked").value;
  let answerResultDiv = document.querySelector("p#multChoiceAnswerResult");
  console.log(triviaAnswers);
  if (triviaAnswers == "true") {
    console.log("Your answer is correct!");
    answerResultDiv.innerText = "Correct!";
  } else {
    console.log("Your answer is incorrect!");
    answerResultDiv.innerText = "Incorrect!";
  }
}

window.addEventListener("load", function() {
  document.querySelector('form#triviaQueryForm').addEventListener("submit", handleTriviaFormSubmission);
  document.querySelector('form#multChoiceAnswerForm').addEventListener("submit", handleMultChoiceAnswerFormSubmission);
});

// create separate forms for T/F questions and multiple choice questions