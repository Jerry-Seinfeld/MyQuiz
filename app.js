function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestionIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.guess = function (answer) {
    if (this.getQuestionIndex().isCorrectAnswer(answer)) {
        this.score++;
    }

    this.questionIndex++;
}

Quiz.prototype.isEnded = function () {
    return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}

Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer === choice;
}


var timeEl = document.querySelector(".timer");

var secondsLeft = 51;

function setTime() {
    var timerInterval = setInterval(function () {
        secondsLeft--;
        timeEl.textContent = secondsLeft;

        if (secondsLeft === 0) {
            clearInterval(timerInterval);
        }

    }, 1000);
}

setTime();



function populate() {
    if (quiz.isEnded()) {
        showScores();
    }
    else {

        var element = document.getElementById("question");
        element.innerHTML = quiz.getQuestionIndex().text;


        var choices = quiz.getQuestionIndex().choices;
        for (var i = 0; i < choices.length; i++) {
            var element = document.getElementById("choice" + i);
            element.innerHTML = choices[i];
            guess("btn" + i, choices[i]);
        }

        showProgress();
    }
};

function guess(id, guess) {
    var button = document.getElementById(id);
    button.onclick = function () {
        quiz.guess(guess);
        populate();
    }
};


function showProgress() {
    var currentQuestionNumber = quiz.questionIndex + 1;
    var element = document.getElementById("progress");
    element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
    var gameOverHTML = "<h1>Result</h1>";
    gameOverHTML += "<h2 id='score'> Your score: " + quiz.score + "</h2>";
    var element = document.getElementById("quiz");
    element.innerHTML = gameOverHTML;
};

function highScore(score) {
    var saved = 0;
    try { saved = parseFloat(localStorage.highScore); } catch (e) { saved = 0; }
    if (!(typeof score === 'undefined')) {
        try { score = parseFloat(score); } catch (e) { score = 0; }
        if (score > saved) {
            saved = score;
            localStorage.highScore = '' + score;
        }
    }
    if (isNaN(saved)) {
        saved = 0;
        localStorage.highScore = '0';
    }
    return saved;
}


// These are the questions
var questions = [
    new Question("Speedometer is an example of ______ computers.", ["Hybrid", "Digital", "Analog", "None of the Above"], "Analog"),
    new Question("______ is the process in which a user sends computer information from his computer to another computer through modem.", ["Downloading", "Uploading", "All of the above", "None of the above"], "Uploading"),
    new Question("A______ is a group of independent computers attached to one another through communication media.", ["Internet", "Email", "Network", "All of the above"], "Network"),
    new Question("Which of the following software is used to view web pages?", ["Web browser", "Internet browser", "Page browser", "All of the above"], "Web browser"),
    new Question("Every number system has a base, which is called ______.", ["Index", "Subscript", "Radix", "None of the above"], "Radix")
];

// This creates the quiz.
var quiz = new Quiz(questions);

// This will display the quiz.
populate();




