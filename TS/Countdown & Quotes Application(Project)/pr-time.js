const eventDate =
new Date("January 1, 2027 00:00:00").getTime();

let countdownInterval;

const countdownElement =
document.getElementById("countdown");

function updateCountdown(){

    const now = new Date().getTime();

    const distance = eventDate - now;

    if(distance <= 0){

        clearInterval(countdownInterval);

        countdownElement.innerHTML =
        " Time's up! The event has started.";

        return;
    }

    const days =
    Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
    Math.floor(
        (distance % (1000 * 60 * 60 * 24))
        / (1000 * 60 * 60)
    );

    const minutes =
    Math.floor(
        (distance % (1000 * 60 * 60))
        / (1000 * 60)
    );

    const seconds =
    Math.floor(
        (distance % (1000 * 60))
        / 1000
    );

    countdownElement.innerHTML =
    `${days} Days ${hours} Hours ${minutes} Minutes ${seconds} Seconds`;
}

function startCountdown(){

    clearInterval(countdownInterval);

    countdownInterval =
    setInterval(updateCountdown,1000);

    updateCountdown();
}

function pauseCountdown(){
    clearInterval(countdownInterval);
}

document
.getElementById("startBtn")
.addEventListener("click",startCountdown);

document
.getElementById("pauseBtn")
.addEventListener("click",pauseCountdown);

startCountdown();

const quotes = [

"Success is not final, failure is not fatal: it is the courage to continue that counts.",

"Believe you can and you're halfway there.",

"Dream big and dare to fail.",

"Push yourself because no one else is going to do it for you.",

"Every day is a new opportunity to grow.",

"Your future is created by what you do today, not tomorrow."

];

let quoteIndex = 0;

const quoteElement =
document.getElementById("quote");

function showQuote(){

    quoteElement.textContent =
    quotes[quoteIndex];
}

showQuote();

setInterval(() => {

    quoteIndex++;

    if(quoteIndex >= quotes.length){
        quoteIndex = 0;
    }

    showQuote();

},4000);

document
.getElementById("nextBtn")
.addEventListener("click",() => {

    quoteIndex++;

    if(quoteIndex >= quotes.length){
        quoteIndex = 0;
    }

    showQuote();
});

document
.getElementById("prevBtn")
.addEventListener("click",() => {

    quoteIndex--;

    if(quoteIndex < 0){
        quoteIndex = quotes.length - 1;
    }

    showQuote();
});

const modal =
document.getElementById("modal");

const closeModal =
document.getElementById("closeModal");

setTimeout(() => {
    modal.style.display = "flex";
}, 1000);

closeModal.addEventListener("click",() => {

    modal.style.display = "none";

});

window.addEventListener("click",(e) => {

    if(e.target === modal){
        modal.style.display = "none";
    }

});