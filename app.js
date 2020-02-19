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
    new Question("Which of the following is a server-side Java Script object?", ["Function", "File", "FileUpload", "Date"], "File"),
    new Question("Which of the following is the tainted property of a window object in Java Script?", ["Pathname", "Defaultstatus", "Protocol", "Host"], "Defaultstatus"),
    new Question("Which of the below is used in Java script to insert special characters?", ["&", "-", "%", "None of the above"], "None of the above"),
    new Question("Which of the following is correct to write “Hello World” on the web page?", ["System.out.println(“Hello World”)", "document.write(“Hello World”)", "print(“Hello World”)", "response.write(“Hello World”)"], "document.write(“Hello World”)"),
    new Question("Which attribute needs to be changed to make elements invisible?", ["visibilty", "invisible", "visible", "invisibility"], "visibilty")
];

// This creates the quiz.
var quiz = new Quiz(questions);

// This will display the quiz.
populate();




