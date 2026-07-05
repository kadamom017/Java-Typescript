# JavaScript Quiz Application

A simple and interactive Web Quiz Application built using HTML, CSS and JavaScript. 

## Project Preview

![Quiz Preview](./Output.png)

---

### Video Walkthrough

[▶ Watch Demo Video](https://drive.google.com)

---

## Features

- JavaScript multiple-choice questions.
- 10-second timer for each question.
- Automatically moves to the next question when time runs out.
- Back and Next button to revisit previos question and move previous question respectively.
- After Completing Quizz, Progress bar showing quiz completion. 
- Final score will be displayed after completing the quiz.
- Restart Quiz option was also given.

---

## Built With

- HTML5
- CSS3
- JavaScript

---

## Project Structure

Quiz-App/
│
├── index.html
├── style.css
├── script.js
├── README.md
└── Quizz-preview.png(Output)
    
---

## How the Application Works

1. The quiz starts with the first JavaScript question.
2. Each question has a **10-second timer**.
3. Users select one answer from the available options.
4. The **Next** button is enabled only after selecting an answer.
5. If the timer reaches **0**, the application automatically loads the next question.
6. Users can return to previous questions using the **Back** button.
7. After the final question, the application calculates and displays the total score.
8. The **Restart Quiz** button starts the quiz again from Question 1.

---

## Customizing Questions

All questions are stored inside the **quizData** array in `script.js`.

Example:

```javascript
{
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: [
        "int",
        "let",
        "string",
        "define"
    ],
    answer: "let"
}

You can edit, remove, or add new questions by updating this array.

---

## Author

Om Kadam.
