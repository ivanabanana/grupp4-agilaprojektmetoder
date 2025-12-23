// Denna fil hanterar alla funktioner för att visa frågor och svarsalternativ
import { questions } from './questions.js';
import { updateProgressbar } from './progress-bar.js';

let currentQuestionIndex = 0;

// Funktion för att hämta aktuell fråga
function getCurrentQuestion() {
    return questions[currentQuestionIndex];
}

// Funktion för att visa frågan på skärmen
function displayQuestion() {
    const currentQuestion = getCurrentQuestion();

    // Hämta HTML-element
    const questionText = document.getElementById('question-text');
    const progressText = document.querySelector('.progress-text');
    const nextBtn = document.getElementById('next-btn');

    // Uppdaterar frågetexten
    questionText.textContent = currentQuestion.question;

    // Uppdaterar "Fråga 1 av 10"
    progressText.textContent = `Fråga ${currentQuestionIndex + 1} av ${questions.length}`;

    // Göm "Nästa fråga"-knappen när ny fråga visas
    nextBtn.classList.add('hidden');

    // Hämtar knappar från HTML
    const optionsContainer = document.getElementById('options-container');
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    // Loopar igenom och uppdaterar varje knapp
    allButtons.forEach((button, index) => {
        // Sätt texten från questions.js
        button.textContent = currentQuestion.options[index];
        
        // Återställ styling (ta bort röd/grön från förra frågan)
        button.disabled = false;
        button.classList.remove('correct', 'wrong');
    });

    // Uppdaterar progress dots
    updateProgressbar(currentQuestionIndex);

    console.log(`Visar fråga ${currentQuestionIndex + 1}: ${currentQuestion.question}`);
}

// Funktion som hanterar när man klickar på ett svarsalternativ
function handleAnswerClick(selectedIndex) {
    const currentQuestion = getCurrentQuestion();
    const optionsContainer = document.getElementById('options-container');
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    const nextBtn = document.getElementById('next-btn');

    // Lås alla knappar efter att man klickat på ett svar (kan inte klicka på flera)
    allButtons.forEach(button => {
        button.disabled = true;
    });

    // Hämtar det valda svaret och rätt svar
    const selectedAnswer = currentQuestion.options[selectedIndex];
    const correctAnswer = currentQuestion.correctAnswer;

    // Kollar om svaret är rätt eller fel
    const isCorrect = selectedAnswer === correctAnswer;

    // VISUELL MARKERING 
    if (isCorrect) {
        // Rätt svar - lägg till 'correct' class 
        allButtons[selectedIndex].classList.add('correct');
        console.log("Rätt svar!");
        
    } else {
        // Fel svar - lägg till 'wrong' class på vald knapp
        allButtons[selectedIndex].classList.add('wrong');
        console.log("Fel svar!");
        
        // Visar rätt svar
        allButtons.forEach((button, index) => {
            if (currentQuestion.options[index] === correctAnswer) {
                button.classList.add('correct');
            }
        });
    }

    // Skicka event till score.js
    notifyScore(isCorrect);

    // Visa "Nästa fråga"-knappen
    nextBtn.classList.remove('hidden');

    console.log(`Valt svar: ${selectedAnswer}`);
    console.log(`Rätt svar: ${correctAnswer}`);
}

// Funktion som meddelar score.js om svaret var rätt/fel
function notifyScore(isCorrect) {
    const event = new CustomEvent('answerSubmitted', { 
        detail: { isCorrect: isCorrect } 
    });
    document.dispatchEvent(event);
    
    console.log(`Event skickat till score.js: isCorrect = ${isCorrect}`);
}

// Function för att gå till nästa fråga
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

// Lägger till event listeners en gång när sidan laddas
function initQuestionHandlers() {
    const nextBtn = document.getElementById('next-btn');
    nextBtn.addEventListener('click', goToNextQuestion);
    
    // Lägg till click-event på alla svarsalternativ-knappar
    const optionsContainer = document.getElementById('options-container');
    const allButtons = optionsContainer.querySelectorAll('.option-btn');
    
    allButtons.forEach((button, index) => {
        button.addEventListener('click', () => handleAnswerClick(index));
    });
    
    console.log("Question handlers initialiserade!");
}

// Exporterar funktioner
export {
    displayQuestion,
    goToNextQuestion,
    resetQuiz,
    currentQuestionIndex,
    initQuestionHandlers,
    handleAnswerClick
}