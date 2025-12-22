const startBtn = document.getElementById('start-btn')
const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const currentScore = document.getElementById('current-score')

// Importerar från questionHandler
import { displayQuestion, resetQuiz, initQuestionHandlers } from './questionhandler.js';

function startQuiz() {
    //göm startsida
    startScreen.classList.remove('screen-active');
    startScreen.classList.add('screen');

    //visa quizsida
    quizScreen.classList.remove('screen');
    quizScreen.classList.add('screen-active');

    //poängen nollställs
    currentScore.textContent = '0';
}

//knappfunktion
startBtn.addEventListener('click', startQuiz);

import { initStart } from './start.js';
import { questions } from './questions.js';
import { updateScore } from './score.js';
// Lägger till import för fråge-funktionerna
import { displayQuestion, resetQuiz, initQuestionHandlers, currentQuestionIndex } from './questionhandler.js'

//initiera startfunktionen
initStart()


//funktion för att hämta frågor (Sanel)
const getQuestions = () => {
    return questions;
}

console.log(getQuestions());


//här anropar vi poänglogiken (Sanel)

function handleUserAnswer(userSelectedCorrect) {
    const newState = updateScore(userSelectedCorrect);

    console.log("Poäng:", newState.score);
    console.log("Streak:", newState.streak);
}

// INITIERA question handlers när sidan laddas
initQuestionHandlers();