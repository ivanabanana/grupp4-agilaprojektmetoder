const startBtn = document.getElementById('start-btn')
const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const currentScore = document.getElementById('current-score')

// Lägger till import för fråge-funktionerna
import { displayQuestion, resetQuiz, initQuestionHandlers } from './questionhandler.js'

function startQuiz() {
    //göm startsida
    startScreen.classList.remove('screen-active');
    startScreen.classList.add('screen');

    //visa quizsida
    quizScreen.classList.remove('screen');
    quizScreen.classList.add('screen-active');

    //poängen nollställs
    currentScore.textContent = '0';

    // Återställ frågeindex och visa första frågan (Maryam)
    resetQuiz(); // Hämtar funktionen från questionhandlers
    displayQuestion(); // Hämtar funktionen från questionhandlers
}

//knappfunktion
startBtn.addEventListener('click', startQuiz);

import { questions } from './questions.js';


//funktion för att hämta frågor (Sanel)
const getQuestions = () => {
    return questions;
}

console.log(getQuestions());


//här anropar vi poänglogiken (Sanel)
import { updateScore } from './score.js';

function handleUserAnswer(userSelectedCorrect) {
    const newState = updateScore(userSelectedCorrect);

    console.log("Poäng:", newState.score);
    console.log("Streak:", newState.streak);
}

// Progress bar (Maryam)
import { currentQuestionIndex } from './questionhandler.js';

function updateProgressbar() {
    const dots = document.querySelectorAll('.dot');
    
    dots.forEach(dot => dot.classList.remove('active'));
    
    if (dots[currentQuestionIndex]) {
        dots[currentQuestionIndex].classList.add('active');
    }
    
    console.log(`Progress dots uppdaterad! Fråga ${currentQuestionIndex + 1}`);
}

export { updateProgressbar };

// Initialiserar allt när sidan laddas
// Sätter upp event listener för "Nästa fråga"
initQuestionHandlers();