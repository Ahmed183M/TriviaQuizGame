// Landing Page
const landingPage = document.getElementById("landingPage");

const quizGo = document.getElementById("quizGo");

// Categories Page
const categoryPage = document.getElementById("categoryPage");

const categories = document.getElementById("categories");
const difficulty = document.getElementById("difficulty");
const quizStart = document.getElementById("quizStart");

// Questions Page
const questionPage = document.getElementById("questionPage");

const questionPart = document.getElementById("questionPart");
const QNumber = document.getElementById("QNumber");
const answerState = document.getElementById("answerState");
const question = document.getElementById("question");

const answersPart = document.getElementById("answersPart");
const answer1 = document.getElementById("answer1");
const answer2 = document.getElementById("answer2");
const answer3 = document.getElementById("answer3");
const answer4 = document.getElementById("answer4");
const nextQuestion = document.getElementById("nextQuestion");

// Final Page
const finalPage = document.getElementById("finalPage");

const playAgainText = document.getElementById("playAgainText");
const playAgain = document.getElementById("playAgain");

// API
const categoriesURL = "https://opentdb.com/api_category.php";
const baseURL = "https://opentdb.com/api.php?amount=10&type=multiple";

landingPage.style.display = "block";

// Go to QUIZ!
const go2category = () => {
    fetch(categoriesURL).then(
        response => response.json()
    ).then(json => {
        json.trivia_categories.forEach(category => {
            const newOption = document.createElement("option");
            newOption.setAttribute("value", category.id);
            newOption.innerHTML = category.name;
            categories.append(newOption);
        });
        landingPage.style.display = "none";
        categoryPage.style.display = "block";
    })
}
quizGo.addEventListener("click", go2category);

// To shuffly an array, used it to randomly order the answers!
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Start the QUIZ!
const startQuiz = () => {
    const usableURL = baseURL + "&category=" + categories.value + "&difficulty=" + difficulty.value;
    fetch(usableURL).then(
        response => response.json()
    ).then(json => {

        json.results.forEach(result => {
            listOfQuestions.addQuestion(result.question);
            listOfAnswers.addAnswer(result.correct_answer, result.incorrect_answers[0], result.incorrect_answers[1], result.incorrect_answers[2]);
        });

        let counter = 0;
        const questionPreviewer = () => {
            QNumber.innerHTML = "Question " + counter + 1 + " out of 10.";
            question.innerHTML = listOfQuestions.allQuestions()[counter].questionBody;
            counter++;
            if (counter == 9) {
                nextQuestion.innerHTML = "Go to Results!"
            }
            if (counter == 10) {

                
                questionPage.style.display = "none";
                finalPage.style.display = "block";
            }
        }
        questionPreviewer();
        nextQuestion.addEventListener("click", questionPreviewer);

        categoryPage.style.display = "none";
        questionPage.style.display = "block";
    })
}
quizStart.addEventListener("click", startQuiz);

class Question {
    constructor(questionBody) {
        this.questionBody = questionBody;
    }
}

class QuestionsList {
    constructor() {
        this.Questions = [];
    }

    allQuestions() {
        return this.Questions;
    }

    addQuestion(questionBody) {
        let newQuestion = new Question(questionBody);
        this.Questions.push(newQuestion);
    }
}

let listOfQuestions = new QuestionsList();

class Answer {
    constructor(correctAnswer, falseAnswer1, falseAnswer2, falseAnswer3) {
        this.correctAnswer = correctAnswer;
        this.falseAnswer1 = falseAnswer1;
        this.falseAnswer2 = falseAnswer2;
        this.falseAnswer3 = falseAnswer3;
    }
}

class AnswersList {
    constructor() {
        this.Answers = [];
    }

    allAnswers() {
        return this.Answers;
    }

    addAnswer(correctAnswer, falseAnswer1, falseAnswer2, falseAnswer3) {
        let newAnswer = new Answer(correctAnswer, falseAnswer1, falseAnswer2, falseAnswer3);
        this.Answers.push(newAnswer);
    }
}

let listOfAnswers = new AnswersList();