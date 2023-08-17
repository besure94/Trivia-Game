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
    url = `https://opentdb.com/api.php?amount=10&category=14`;
  } else if (searchType === "geography") {
    url = `https://opentdb.com/api.php?amount=10&category=22`;
  } else if (searchType === "history") {
    url = `https://opentdb.com/api.php?amount=10&category=23`;
  } else if (searchType === "politics") {
    url = `https://opentdb.com/api.php?amount=10&category=24`;
  }
}