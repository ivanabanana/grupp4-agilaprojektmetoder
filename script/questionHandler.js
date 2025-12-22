// Denna fil hanterar alla funktioner för att visa frågor och svarsalternativ
import { questions } from './questions.js';
import { updateProgressbar } from './script.js';

let currentQuestionIndex = 0;

// Funktion för att hämta aktuell fråga
function getCurrentQuestion() {
    // Returnerar frågan vi är på just nu
    return questions[currentQuestionIndex];
}

// Funktion för att visa frågan på skärmen
// Lägger till lite console loggar för att ha koll om det funkar
function displayQuestion() {
    // Hämta den aktuella frågan
    const currentQuestion = getCurrentQuestion();

    // Hämta HTML-element där vi ska visa frågan
    const questionText = document.getElementById('question-text');
    const progressText = document.querySelector('.progress-text');

    // Uppdaterar frågetexten
    questionText.textContent = currentQuestion.question;

    // Uppdaterar "Fråga 1 av 10"
    progressText.textContent = `Fråga ${currentQuestionIndex + 1} av ${questions.length}`;

    // Hämtar 4 svarsalternativ-knappar från HTML
    const optionsContainer = document.getElementById('options-container');
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    allButtons.forEach((button, index) => {
        // Sätter texten från questions.js
        button.textContent = currentQuestion.options[index];
    });

    // Uppdaterar progress dots
    updateProgressbar();

    // DEBUGGING! Radera när projektet är färdigt
    console.log(`Visar fråga ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
}

// Function för att gå till nästa fråga
// Lägger till lite console loggar för att ha koll om det funkar
function goToNextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        console.log("Quizet är slut, alla frågor visade.");
        alert("Quiz slut! Alla 10 frågor är besvarade");
    }
}

function resetQuiz() {
    currentQuestionIndex = 0;
    console.log("Quiz återställt!");
}

// Init event listeners 
// Det här hämtar info från html filen, om någon klickar på nästa fråga-knappen så går den vidare till nästa fråga
// Lägger till lite console loggar för att ha koll om det funkar
function initQuestionHandlers() {
    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', goToNextQuestion);
    console.log("Question handlers initialiserade!");
}

// Exporterar funktioner
export {
    displayQuestion,
    goToNextQuestion,
    resetQuiz,
    currentQuestionIndex,
    initQuestionHandlers
}