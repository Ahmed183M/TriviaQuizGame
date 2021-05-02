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

const scoreDisplay = document.getElementById("scoreDisplay");
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
        let score = 0;
        let selectedAnswer = 0;
        const questionPreviewer = () => {
            answerState.innerHTML = "";
            answer1.style.backgroundColor = "white";
            answer1.style.color = "black";
            answer2.style.backgroundColor = "white";
            answer2.style.color = "black";
            answer3.style.backgroundColor = "white";
            answer3.style.color = "black";
            answer4.style.backgroundColor = "white";
            answer4.style.color = "black";

            if (counter == 9) {
                nextQuestion.innerHTML = "Go to Results!"
            }
            if (counter == 10) {
                let emoji;
                if (score < 3) emoji = "😢";
                else if (score >= 3 && score < 5) emoji = "🙁";
                else if (score >= 5 && score < 10) emoji = "🙂";
                else if (score == 10) emoji = "😎";

                scoreDisplay.innerHTML = "Your score was: " + score + " " + emoji;

                questionPage.style.display = "none";
                finalPage.style.display = "block";
            } else {
                clicked = false;

                QNumber.innerHTML = "Question " + (counter + 1) + " out of 10.";
                question.innerHTML = listOfQuestions.allQuestions()[counter].questionBody;

                console.log(listOfAnswers.allAnswers());
                let shuffledAnswers = [];
                shuffledAnswers[0] = listOfAnswers.allAnswers()[counter].correctAnswer;
                shuffledAnswers[1] = listOfAnswers.allAnswers()[counter].falseAnswer1;
                shuffledAnswers[2] = listOfAnswers.allAnswers()[counter].falseAnswer2;
                shuffledAnswers[3] = listOfAnswers.allAnswers()[counter].falseAnswer3;
                console.log(shuffledAnswers);
                shuffledAnswers = shuffle(shuffledAnswers);
                console.log(shuffledAnswers);
                answer1.innerHTML = shuffledAnswers[0];
                answer2.innerHTML = shuffledAnswers[1];
                answer3.innerHTML = shuffledAnswers[2];
                answer4.innerHTML = shuffledAnswers[3];

                if (selectedAnswer == 0 && counter > 0) {
                    alert("Please Choose an Answer First!\nAnswers have been shuffled!")
                } else {
                    selectedAnswer = 0;
                    const setAnswer1 = () => {
                        if (clicked == false) {
                            clicked = true;
                            selectedAnswer = answer1.innerHTML;
                            if (selectedAnswer != listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer1.style.backgroundColor = "red";
                                answer1.style.color = "white";
                                answerState.innerHTML = "False!";
                                answerState.style.color = "red";
                            } else if (selectedAnswer == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer1.style.backgroundColor = "green";
                                answer1.style.color = "white";
                                answerState.innerHTML = "Correct!";
                                answerState.style.color = "green";
                                score++;
                            }

                            console.log(selectedAnswer);
                            console.log(listOfAnswers.allAnswers()[counter].correctAnswer);
                            if (answer2.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer2.style.backgroundColor = "green";
                                answer2.style.color = "white";
                            } else if (answer3.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer3.style.backgroundColor = "green";
                                answer3.style.color = "white";
                            } else if (answer4.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer4.style.backgroundColor = "green";
                                answer4.style.color = "white";
                            }
                            counter++;
                        }
                    }
                    const setAnswer2 = () => {
                        if (clicked == false) {
                            clicked = true;
                            selectedAnswer = answer2.innerHTML;
                            if (selectedAnswer != listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer2.style.backgroundColor = "red";
                                answer2.style.color = "white";
                                answerState.innerHTML = "False!";
                                answerState.style.color = "red";
                            } else if (selectedAnswer == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer2.style.backgroundColor = "green";
                                answer2.style.color = "white";
                                answerState.innerHTML = "Correct!";
                                answerState.style.color = "green";
                                score++;
                            }

                            console.log(selectedAnswer);
                            console.log(listOfAnswers.allAnswers()[counter].correctAnswer);
                            if (answer1.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer1.style.backgroundColor = "green";
                                answer1.style.color = "white";
                            } else if (answer3.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer3.style.backgroundColor = "green";
                                answer3.style.color = "white";
                            } else if (answer4.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer4.style.backgroundColor = "green";
                                answer4.style.color = "white";
                            }
                            counter++;
                        }
                    }
                    const setAnswer3 = () => {
                        if (clicked == false) {
                            clicked = true;
                            selectedAnswer = answer3.innerHTML;
                            if (selectedAnswer != listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer3.style.backgroundColor = "red";
                                answer3.style.color = "white";
                                answerState.innerHTML = "False!";
                                answerState.style.color = "red";
                            } else if (selectedAnswer == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer3.style.backgroundColor = "green";
                                answer3.style.color = "white";
                                answerState.innerHTML = "Correct!";
                                answerState.style.color = "green";
                                score++;
                            }

                            console.log(selectedAnswer);
                            console.log(listOfAnswers.allAnswers()[counter].correctAnswer);
                            if (answer2.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer2.style.backgroundColor = "green";
                                answer2.style.color = "white";
                            } else if (answer1.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer1.style.backgroundColor = "green";
                                answer1.style.color = "white";
                            } else if (answer4.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer4.style.backgroundColor = "green";
                                answer4.style.color = "white";
                            }
                            counter++;
                        }
                    }
                    const setAnswer4 = () => {
                        if (clicked == false) {
                            clicked = true;
                            selectedAnswer = answer4.innerHTML;
                            if (selectedAnswer != listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer4.style.backgroundColor = "red";
                                answer4.style.color = "white";
                                answerState.innerHTML = "False!";
                                answerState.style.color = "red";
                            } else if (selectedAnswer == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer4.style.backgroundColor = "green";
                                answer4.style.color = "white";
                                answerState.innerHTML = "Correct!";
                                answerState.style.color = "green";
                                score++;
                            }

                            console.log(selectedAnswer);
                            console.log(listOfAnswers.allAnswers()[counter].correctAnswer);
                            if (answer2.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer2.style.backgroundColor = "green";
                                answer2.style.color = "white";
                            } else if (answer3.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer3.style.backgroundColor = "green";
                                answer3.style.color = "white";
                            } else if (answer1.innerHTML == listOfAnswers.allAnswers()[counter].correctAnswer) {
                                answer1.style.backgroundColor = "green";
                                answer1.style.color = "white";
                            }
                            counter++;
                        }
                    }
                    answer1.addEventListener("click", setAnswer1);
                    answer2.addEventListener("click", setAnswer2);
                    answer3.addEventListener("click", setAnswer3);
                    answer4.addEventListener("click", setAnswer4);


                }
            }
        }
        questionPreviewer();
        nextQuestion.addEventListener("click", questionPreviewer);

        categoryPage.style.display = "none";
        questionPage.style.display = "block";
    })
}
quizStart.addEventListener("click", startQuiz);


const reload = () => {
    location.reload();
}
playAgain.addEventListener("click", reload);
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