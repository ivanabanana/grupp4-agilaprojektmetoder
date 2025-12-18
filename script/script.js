const startBtn = document.getElementById('start-btn')
const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const currentScore = document.getElementById('current-score')

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


// PROGRESS BAR för att lägga till class på dots (Maryam)
// VIKTIGT: Denna variabel måste sättas från den som jobbar med frågelogiken
// När vi visar en ny fråga, uppdatera denna variabel och anropa updatePrograssbar()
let currentQuestionIndex = 0;

function updateProgressbar () {
    const dots = document.querySelectorAll('.dot');

    // Ta bort active från alla dots
    dots.forEach(dot => dot.classList.remove('active'));

    // Lägg till 'active' class på den aktuella dot:en
    // currentQuestionIndex börjar på 0, så första frågan = dots[0]
    if (dots[currentQuestionIndex]) {
        dots[currentQuestionIndex].classList.add('active');
    }

    // Debugging - ta bort denna rad när allt funkar!
    console.log(`Progress dot uppdaterad! fråga ${currentQuestionIndex + 1}`);
}

// Exporterar funktionen 
export { updateProgressbar, currentQuestionIndex };