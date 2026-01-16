const questions = [
    { question: "What is the capital of France?", answers: [
        { text: "Berlin", correct: false }, 
        { text: "Madrid", correct: false }, 
        { text: "Paris", correct: true }, 
        { text: "Rome", correct: false }
    ]},
    { question: "Which is the largest planet?", answers: [
        { text: "Earth", correct: false }, 
        { text: "Mars", correct: false }, 
        { text: "Jupiter", correct: true }, 
        { text: "Saturn", correct: false }
    ]},
    { question: "Who wrote 'Hamlet'?", answers: [
        { text: "Shakespeare", correct: true }, 
        { text: "Hemingway", correct: false }, 
        { text: "Tolkien", correct: false }, 
        { text: "Austen", correct: false }
    ]},
    { question: "What is the square root of 64?", answers: [
        { text: "6", correct: false }, 
        { text: "8", correct: true }, 
        { text: "10", correct: false }, 
        { text: "12", correct: false }
    ]},
    { question: "Which ocean is the largest?", answers: [
        { text: "Atlantic", correct: false }, 
        { text: "Indian", correct: false }, 
        { text: "Pacific", correct: true }, 
        { text: "Arctic", correct: false }
    ]},
    { question: "Who painted the Mona Lisa?", answers: [
        { text: "Van Gogh", correct: false }, 
        { text: "Da Vinci", correct: true }, 
        { text: "Picasso", correct: false }, 
        { text: "Rembrandt", correct: false }
    ]},
    { question: "What is the boiling point of water?", answers: [
        { text: "90°C", correct: false }, 
        { text: "100°C", correct: true }, 
        { text: "120°C", correct: false }, 
        { text: "80°C", correct: false }
    ]},
    { question: "Who discovered gravity?", answers: [
        { text: "Newton", correct: true }, 
        { text: "Einstein", correct: false }, 
        { text: "Galileo", correct: false }, 
        { text: "Darwin", correct: false }
    ]},
    { question: "Which is the smallest country?", answers: [
        { text: "Vatican City", correct: true }, 
        { text: "Monaco", correct: false }, 
        { text: "Luxembourg", correct: false }, 
        { text: "Liechtenstein", correct: false }
    ]},
    { question: "Which planet is known as the 'Red Planet'?", answers: [
        { text: "Earth", correct: false }, 
        { text: "Mars", correct: true }, 
        { text: "Jupiter", correct: false }, 
        { text: "Venus", correct: false }
    ]}
];

let currentQuestionIndex = 0;
let score = 0;
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const scoreDisplay = document.getElementById("score-value");
const timerDisplay = document.getElementById("time-left");

let timeLeft = 10;
let timerInterval;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = "none";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("btn");
        if (answer.correct) button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });

    startTimer();
}

function resetState() {
    clearInterval(timerInterval);
    timerDisplay.innerText = "10";
    answerButtons.innerHTML = "";
    nextButton.style.display = "none";
}

function startTimer() {
    timeLeft = 10;
    timerDisplay.innerText = timeLeft;

    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.innerText = timeLeft;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            // Automatically go to next question when time runs out
            nextButton.style.display = "block";
            disableButtons();
        }
    }, 1000);
}

function disableButtons() {
    const buttons = answerButtons.querySelectorAll("button");
    buttons.forEach(btn => btn.disabled = true);
}

function selectAnswer(e) {
    clearInterval(timerInterval);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";

    if (correct) {
        selectedButton.classList.add("correct");
        score++;
    } else {
        selectedButton.classList.add("wrong");
    }

    disableButtons();
    scoreDisplay.innerText = score;
    nextButton.style.display = "block";
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        alert(`Quiz Over! Your Score: ${score}`);
        startQuiz();
    }
}

nextButton.addEventListener("click", nextQuestion);
document.addEventListener("DOMContentLoaded", startQuiz);
