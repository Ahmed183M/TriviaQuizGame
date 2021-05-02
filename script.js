const landingPage = document.getElementById("landingPage");
const quizGo = document.getElementById("quizGo");

const categoryPage = document.getElementById("categoryPage");
const categories = document.getElementById("categories");
const difficulty = document.getElementById("difficulty");
const quizStart = document.getElementById("quizStart");

const finalPage = document.getElementById("finalPage");
const playAgainText = document.getElementById("playAgainText");
const playAgain = document.getElementById("playAgain");

const questionPage = document.getElementById("questionPage");
const questionPart = document.getElementById("questionPart");
const answersPart = document.getElementById("answersPart");

const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");

const nextQuestion = document.getElementById("nextQuestion");

const URL = "https://opentdb.com/api.php?amount=10&category=21&difficulty=medium&type=multiple";

landingPage.style.visibility = "visible";