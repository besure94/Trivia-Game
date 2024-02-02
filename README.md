# Trivia Questions!

#### An application that allows a user to search for a trivia question by topic, and guess the answers.

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

This application communicates with the [Open Trivia Database API](https://opentdb.com/login.php). It does not require an API key. If you want to change queries for the number of trivia questions, types of categories, difficulty levels, or types of questions, please follow the API documentation available on the Open Trivia Database API website, and replace the URL on line 5 of openTriviaApi.js with the URL you have created.

Users are presented with a button called "Begin!", which will start the application when clicked. They are then given a trivia question from a randomly selected topic, which is either a true/false or multiple choice question. Users then answer the question and press "Guess!" to see if they answered it correctly. They are then shown a button called "Next Question!", which will query the API and display another question. Users can answer as many questions as they desire.

## Setup/Installation Requirements

**Note: this application is still being worked on. To use the application at its current functional state, please use the `main` branch**

* Select the green "Code" button, and clone this repository to your desktop.
* In the terminal, go to your project folder and run the command `$ npm install` to install node_modules.
* Run the command `$ npm run build` to bundle together JS files.
* Enter the command `$ npm run start` to start a live development server.

## Known Bugs

* Currently the user is not shown a message telling them to please select an answer if they do not select an answer and click "Guess!". Instead the form will just not submit.
* There is not functionality to ensure that the user is not given the same question twice.

## Further Exploration

* My next goal is to add functionality to tally the users correct and incorrect answers, to make the application function more like a game.
* Eventually I would like to refactor the application to show the user multiple questions in the form of trivia cards, which they can choose from.

## License

MIT

Copyright(c) 2024 Brian Scherner
