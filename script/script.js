const startBtn = document.getElementById('start-btn')
const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const currentScore = document.getElementById('current-score')

// IMPORTS, Flyttade alla hit upp istället / Maryam
import { initStart } from './start.js';
import { questions } from './questions.js';
import { updateScore } from './score.js';
import { initQuestionHandlers, currentQuestionIndex } from './questionhandler.js'; // Maryam

//initiera startfunktionen
initStart()
initQuestionHandlers(); // MARYAM: Sätter upp click-events för svarsalternativen och "Nästa fråga"

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