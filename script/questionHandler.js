// Denna fil hanterar alla funktioner för att visa frågor och svarsalternativ
import { questions } from './questions.js';
import { updateProgressbar } from './progress-bar.js';
import { updateScore } from './score.js';

let currentQuestionIndex = 0;

// Funktion för att hämta aktuell fråga
function getCurrentQuestion() {
    return questions[currentQuestionIndex];
}

export function displayQuestion() {
    const currentQuestion = getCurrentQuestion();
    const questionText = document.getElementById('question-text');
    const progressText = document.querySelector('.progress-text');
    const nextBtn = document.getElementById('next-btn');

    questionText.textContent = currentQuestion.question;
    progressText.textContent = `Fråga ${currentQuestionIndex + 1} av ${questions.length}`;

    nextBtn.classList.add('hidden');

    const optionsContainer = document.getElementById('options-container');
    const allButtons = optionsContainer.querySelectorAll('.option-btn');

    allButtons.forEach((button, index) => {
        button.textContent = currentQuestion.options[index];
        button.disabled = false;
        button.classList.remove('correct', 'wrong');
    });

    updateProgressbar(currentQuestionIndex);
}

export function handleAnswerClick(selectedIndex) {
    const currentQuestion = getCurrentQuestion();
    const allButtons = document.querySelectorAll('.option-btn');
    const nextBtn = document.getElementById('next-btn');

    const selectedAnswer = currentQuestion.options[selectedIndex];
    const correctAnswer = currentQuestion.correctAnswer;
    const isCorrect = selectedAnswer === correctAnswer;

    const updatedState = updateScore(isCorrect);

    if (updatedState.streak === 3) {
        alert("Snyggt, du är on fire! 🔥 ");
    }




    const scoreElement = document.getElementById('current-score');
    if (scoreElement) {
        scoreElement.textContent = updatedState.score;
    }

    allButtons.forEach(button => button.disabled = true);

    if (isCorrect) {
        allButtons[selectedIndex].classList.add('correct');
    } else {
        allButtons[selectedIndex].classList.add("wrong");
        allButtons.forEach((button, index) => {
            if (currentQuestion.options[index] === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    nextBtn.classList.remove('hidden');
}

export function goToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        showResultScreen();
    }
}

export function resetQuiz() {
    currentQuestionIndex = 0;
    }

export function initQuestionHandlers() {
    const nextBtn = document.getElementById('next-btn');
    if (nextBtn) nextBtn.addEventListener('click', goToNextQuestion);

    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach((button, index) => {
        button.addEventListener('click', () => handleAnswerClick(index));
    });
}

function showResultScreen() {
    document.getElementById('quiz-screen').classList.remove('screen-active');
    document.getElementById('quiz-screen').style.display = 'none';

    const resultScreen = document.getElementById('result-screen');
    resultScreen.classList.add('screen-active');
    resultScreen.style.display = 'block';

    const finalScore = localStorage.getItem('quiz_current_score') || 0;
    const scoreNumberElem = document.getElementById('score-number');
    
    if (scoreNumberElem) {
        scoreNumberElem.textContent = finalScore;
    }

    console.log("Visar resultat: " + finalScore + " poäng.");
}
