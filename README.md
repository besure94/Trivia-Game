# Trivia!

#### An application that allows a user to search for a trivia question by topic, and guess the answer.

#### By Brian Scherner

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* Webpack
* Node Package Manager
* Open Trivia Database

## Description

This application communicates with the [Open Trivia Database API](https://opentdb.com/login.php). It does not require an API key.

Users are given a brief description of how to use the application, which they do by selecting a topic and then clicking "Search". They are then given a random trivia question from that topic, which is either a true/false or multiple choice question. Users then answer the question and press "Submit" to see if they answered it correctly. They are then given a prompt to select another question, at which point the page reloads and they can continue searching for trivia questions.

## Setup/Installation Requirements

* Select the green "Code" button, and clone this repository to your desktop.
* In the terminal, go to your project folder and run the command `$ npm install` to install node_modules.
* Run the command `$ npm run build` to bundle together JS files.
* Enter the command `$ npm run start` to start a live development server.

## Known Bugs

* If the user selects "Submit" without selecting an answer, the "Submit" button is hidden, and the user has to then refresh the page to search for another question.
* I want to allow a user to search for more than one question at a time, and tally their correct and incorrect answers.

## License

MIT

Copyright(c) 2024 Brian Scherner