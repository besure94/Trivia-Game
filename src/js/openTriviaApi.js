export default class OpenTriviaApi {
  static getTriviaQuestions() {
    return new Promise(function (resolve, reject) {
      let request = new XMLHttpRequest();
      const url = `https://opentdb.com/api.php?amount=50`;
      request.addEventListener("loadend", function () {
        const response = JSON.parse(this.responseText);
        if (this.status == 200) {
          resolve([response]);
        } else {
          reject([this, response]);
        }
      });
      request.open("GET", url, true);
      request.send();
    });
  }
}