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

// Progress bar (Maryam)

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