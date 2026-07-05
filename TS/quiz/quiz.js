const quizData = [
    {
        question : "Which CSS property is used to create a flexible box layout?",
        options : [
            "display: flex",
            "display: grid",
            "float: left",
            "position: relative"
        ],
        answer : 0
    },
    {
        question : "What does 'box-sizing: border-box' do?",
        options : [
            "Adds a border around every element",
            "Includes padding and border in total width/height",
            "Removes all padding from elements",
            "Makes the element block-level"
        ],
        answer : 1
    },
    {
        question : "Which HTML5 element is used to define navigation links?",
        options : [
            "menu",
            "nav",
            "header",
            "section"
        ],
        answer : 1
    },
    {
        question : "In JavaScript, what does the '===' operator check?",
        options : [
            "Value only",
            "Type only",
            "Value and type (strict equality)",
            "Reference equality"
        ],
        answer : 2
    },
    {
        question : "What is the correct way to add an event listener in vanilla JavaScript?",
        options : [
            "element.onclick = function(){}",
            "element.addEventListener('click', fn)",
            "element.on('click', fn)",
            "element.bind('click', fn)"
        ],
        answer : 1
    },
     {
        question : "Which CSS unit is relative to the font-size of the root element?",
        options : [
            "em",
            "rem",
            "vh",
            "px"
        ],
        answer : 1
    },
    {
        question : "What attribute makes a form input required in HTML5?",
        options : [
            "validate",
            "mandatory",
            "required",
            "must-fill"
        ],
        answer : 2
    },
    {
        question : "Which of the following is NOT a JavaScript array method?",
        options : [
            "map()",
            "filter()",
            "reduce()",
            "compress()"
        ],
        answer : 3
    },
    {
        question : "What does 'z-index' control in CSS?",
        options : [
            "Zoom level of an element",
            "Stacking order of positioned elements",
            "Horizontal alignment",
            "Opacity of an element"
        ],
        answer : 1
    },
    {
        question : "Which CSS pseudo-class selects an element when a user hovers over it?",
        options : [
            ":focus",
            ":active",
            ":hover",
            ":visited"
        ],
        answer : 2
    }
];

let currentQuestion = 0;

let score = 0;

let selectedAnswer = null;

let time = 10;

let interval;

const question = document.getElementById("question");

const options = document.getElementById("options");

const questionCounter = document.getElementById("questionCounter");

function loadQuestion(){
    startTimer();
    
    const q = quizData[currentQuestion];

    options.innerHTML = "";

    question.innerHTML = q.question;

    questionCounter.innerHTML = `<i class="bi bi-hourglass-split"></i> ${currentQuestion + 1} / ${quizData.length}`;

    const letters = ["A","B","C", "D"];

    q.options.forEach((option, index) => {
        const div = document.createElement("div");
        
        div.classList.add("option-item");

        div.innerHTML = ` 
            <span class="option-marker">${letters[index]}</span>

            <span class="option-text">${option}</span>

            <i class="bi bi-check-circle-fill"></i>
        `;

        div.addEventListener("click", () => {
            document.querySelectorAll(".option-item").forEach((item) => {
                item.classList.remove("selected");
            });

            div.classList.add("selected");
            selectedAnswer = index;

            console.log(selectedAnswer);
            
        });
        options.appendChild(div);
    });
    createDot();
}
loadQuestion();

function createDot(){
    const dotContainer = document.getElementById("progressDots");

    dotContainer.innerHTML = "";

    for(let i = 0; i < quizData.length; i++){
        const dot = document.createElement("span");
        dot.classList.add("dot");

        if(i < currentQuestion){
            dot.classList.add("completed");
        }

        if(i == currentQuestion){
            dot.classList.add("active");
        }

        dotContainer.appendChild(dot);
    }
}

document.getElementById("nextBtn").addEventListener('click', () => {
    if(selectedAnswer == null){
        return;
    }
    clearInterval(interval);
    if(selectedAnswer === quizData[currentQuestion].answer){
        score++;
    }
    currentQuestion++;
    selectedAnswer = null;
    if(currentQuestion < quizData.length){
        loadQuestion();
    }
    else{
        showResult();
    }
})

function showResult(){
    document.querySelector(".quiz-card").innerHTML = `
        <div class="text-center p-5">
            <h1>✨ Quiz Completed</h1>
            <h2>Score : ${score} / ${quizData.length}</h2>
            <button class="btn-primary-glow" onclick="location.reload()">Play Again</button>
        </div>
    `
}
function startTimer(){

    clearInterval(interval);

    time = 10;

    document.getElementById("timer").innerHTML = time;
    interval = setInterval(() => {
        time--;
        document.getElementById("timer").innerHTML = time;

        if(time === 0){
            clearInterval(interval);
            selectedAnswer = null;
            currentQuestion++;
            if(currentQuestion < quizData.length){
                loadQuestion();
            }
            else{
                showResult();
            }
        }
    },1000);
}
