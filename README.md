# Trivia Game

#### An application that allows a user to play a game where they answer 10 random trivia questions.

#### By Brian Scherner

## Technologies Used

* HTML
* CSS
* Bootstrap
* JavaScript
* Webpack
* Node Package Manager
* Open Trivia Database API

## Description

**This application communicates with the [Open Trivia Database API](https://opentdb.com/login.php). It does not require an API key.** 

Users are presented with a button called "Play!", which will start the application when clicked. They are then given a trivia question from a randomly selected topic, which is either a true/false or multiple choice question. Users then answer the question and press "Guess!" to see if they answered it correctly. Their correct and incorrect answers are recorded and shown to them, as well as the number of remaining questions. They are then shown a button called "Next Question!", which will return another question. Once 10 questions have been answered, the game ends.

## Setup/Installation Requirements

#### Optional
**Please note that you are not required to do this. You can also just use the URL that is already being used in the project.**
1. Go to the [Open Trivia Database API](https://opentdb.com/login.php).
2. Navigate to the tab in the upper right hand corner that says `API`.
3. Here, you can select the number of questions, categories, difficulties, and type of questions you want to use, as well as the encoding type, which is explained in greater detail in the API documentation.
4. Click `Generate API URL`.
5. Copy the API URL located in the turqoise colored box, and paste it into line 6 of the `openTriviaApi.js` file, after the "=" symbol at `const url =`.
6. `openTriviaApi.js` is located inside the `js` folder, inside of the `src` folder in the project's root folder `Trivia-Game`.
7. Whatever URL you choose to generate will work for this game, provided it is entered correctly. Here is an example of how a URL would look if entered as instructed in steps 5 and 6:
```
const url = `https://opentdb.com/api.php?amount=10&category=14&difficulty=medium`;
```

#### Required

1. Select the green "Code" button, and clone this repository to your desktop.
2. In the terminal, go to your project folder and run the command `$ npm install` to install node_modules.
3. Run the command `$ npm run build` to bundle together JS files.
4. Enter the command `$ npm run start` to start a live development server.

## Known Bugs

* Currently the user is not shown a message telling them to please select an answer if they do not select an answer and click "Guess!". Instead the form will just not submit.
* There is not yet functionality to ensure that the user is not given the same question twice during a game, or a playing session where multiple games are played.
* Although rare, the displayed API question and response contains special characters that are not visually pleasing to a user.

## Further Exploration

* Eventually I would like to refactor the application to show the user multiple questions in the form of trivia cards, which they can choose from.
* Add UI (User Interface) functionality to allow a user to play by selecting a difficulty of their choosing.
* Could also allow a user to play by selecting a topic of their choosing in the UI.

## License

MIT

Copyright(c) 2024 Brian Scherner
