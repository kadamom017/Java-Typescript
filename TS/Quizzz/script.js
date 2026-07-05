const quizData = [
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        options: ["int", "let", "string", "define"],
        answer: "let"
    },
    {
        question: "Which company developed JavaScript?",
        options: ["Microsoft", "Sun Microsystems", "Netscape", "Google"],
        answer: "Netscape"
    },
    {
        question: "What is the output of typeof null?",
        options: ["null", "object", "undefined", "number"],
        answer: "object"
    },
    {
        question: "Which symbol is used for strict equality?",
        options: ["==", "=", "===", "!="],
        answer: "==="
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: ["push()", "pop()", "shift()", "concat()"],
        answer: "push()"
    },
    {
        question: "Which method removes the last element of an array?",
        options: ["shift()", "slice()", "splice()", "pop()"],
        answer: "pop()"
    },
    {
        question: "How do you write a comment in JavaScript?",
        options: ["<!-- -->", "#", "//", "** **"],
        answer: "//"
    },
    {
        question: "Which loop always runs at least once?",
        options: ["for", "while", "do...while", "forEach"],
        answer: "do...while"
    },
    {
        question: "Which method prints data in the browser console?",
        options: ["print()", "console.log()", "echo()", "write()"],
        answer: "console.log()"
    },
    {
        question: "Which keyword creates a constant?",
        options: ["var", "const", "fixed", "static"],
        answer: "const"
    }
];

const question = document.getElementById("question");
const options = document.getElementById("options");
const questionNumber = document.getElementById("questionNumber");
const progressBar = document.getElementById("progressBar");
const timer = document.getElementById("timer");

const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const quizBox = document.querySelector(".quiz-box");
const resultBox = document.getElementById("resultBox");

const finalScore = document.getElementById("finalScore");
const restartBtn = document.getElementById("restartBtn");

let currentQuestion = 0;
let score = 0;

let selectedAnswers = new Array(quizData.length).fill(null);

let timerInterval;
let timeLeft = 10;

loadQuestion();

function loadQuestion() {

    clearInterval(timerInterval);

    const current = quizData[currentQuestion];

    question.innerText = current.question;

    questionNumber.innerText =
        `${currentQuestion + 1} / ${quizData.length}`;

    progressBar.style.width =
        ((currentQuestion + 1) / quizData.length) * 100 + "%";

    options.innerHTML = "";

    current.options.forEach(option => {

        const div = document.createElement("div");

        div.className = "option";

        div.innerText = option;

        if(selectedAnswers[currentQuestion] === option){

            div.classList.add("selected");

        }

        div.onclick = function(){

            document.querySelectorAll(".option").forEach(item=>{

                item.classList.remove("selected");

            });

            div.classList.add("selected");

            selectedAnswers[currentQuestion] = option;

        };

        options.appendChild(div);

    });

    backBtn.disabled = currentQuestion === 0;

    if(currentQuestion === quizData.length-1){

        nextBtn.innerText = "Submit";

    }else{

        nextBtn.innerText = "Next";

    }

    startTimer();

}

function startTimer(){

    clearInterval(timerInterval);

    timeLeft = 10;

    timer.innerText = `${timeLeft}s`;

    timerInterval = setInterval(()=>{

        timeLeft--;

        timer.innerText = `${timeLeft}s`;

        if(timeLeft <= 0){

            clearInterval(timerInterval);

            autoNext();

        }

    },1000);

}

function autoNext(){

    if(currentQuestion < quizData.length-1){

        currentQuestion++;

        loadQuestion();

    }else{

        finishQuiz();

    }

}

nextBtn.onclick = function(){

    if(selectedAnswers[currentQuestion] === null){

        alert("Please select an option.");

        return;

    }

    clearInterval(timerInterval);

    if(currentQuestion < quizData.length-1){

        currentQuestion++;

        loadQuestion();

    }else{

        finishQuiz();

    }

};

backBtn.onclick = function(){

    clearInterval(timerInterval);

    if(currentQuestion > 0){

        currentQuestion--;

        loadQuestion();

    }

};

function finishQuiz(){

    score = 0;

    selectedAnswers.forEach((answer,index)=>{

        if(answer === quizData[index].answer){

            score++;

        }

    });

    quizBox.classList.add("hidden");

    resultBox.classList.remove("hidden");

    finalScore.innerText =
        `You scored ${score} out of ${quizData.length}`;

}

restartBtn.onclick = function(){

    currentQuestion = 0;

    score = 0;

    selectedAnswers.fill(null);

    resultBox.classList.add("hidden");

    quizBox.classList.remove("hidden");

    loadQuestion();

};