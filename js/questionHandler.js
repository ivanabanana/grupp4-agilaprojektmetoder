// Denna fil hanterar alla funktioner för att visa frågor och svarsalternativ
import { questions } from "./questions.js";
import { updateProgressbar } from "./progress-bar.js";
import { showResult } from "./result.js";
import { updateScore } from "./score.js";
import { resetGame } from "./score.js";

let currentQuestionIndex = 0;
let autoAdvanceTimer = null;

// Funktion för att hämta aktuell fråga
function getCurrentQuestion() {
  return questions[currentQuestionIndex];
}

export function displayQuestion() {
  const currentQuestion = getCurrentQuestion();
  const questionText = document.getElementById("question-text");
  const progressText = document.querySelector(".progress-text");
  const nextBtn = document.getElementById("next-btn");

  questionText.textContent = currentQuestion.question;
  progressText.textContent = `Fråga ${currentQuestionIndex + 1} av ${
    questions.length
  }`;

  // Rensar eventuell tidigare timer för automatisk avancering, gör så att knappen "Nästa" försvinner igen
  clearAutoAdvanceTimer();
  nextBtn.classList.add("hidden");
  updateProgressDots(currentQuestionIndex);

  const optionsContainer = document.getElementById("options-container");
  const allButtons = optionsContainer.querySelectorAll(".option-btn");

  allButtons.forEach((button, index) => {
    button.textContent = currentQuestion.options[index];
    button.disabled = false;
    button.classList.remove("correct", "wrong");
  });

  updateProgressbar(currentQuestionIndex);
}

export function handleAnswerClick(selectedIndex) {
  const currentQuestion = getCurrentQuestion();
  const allButtons = document.querySelectorAll(".option-btn");
  const nextBtn = document.getElementById("next-btn");

  const selectedAnswer = currentQuestion.options[selectedIndex];
  const correctAnswer = currentQuestion.correctAnswer;
  const isCorrect = selectedAnswer === correctAnswer;

  const updatedState = updateScore(isCorrect);

  if (updatedState.streak === 3) {
    showToast("Snyggt, du är on fire! 🔥");
  }

  const scoreElement = document.getElementById("current-score");
  if (scoreElement) {
    scoreElement.textContent = updatedState.score;
  }

  allButtons.forEach((button) => (button.disabled = true));

  if (isCorrect) {
    allButtons[selectedIndex].classList.add("correct");
  } else {
    allButtons[selectedIndex].classList.add("wrong");
    allButtons.forEach((button, index) => {
      if (currentQuestion.options[index] === correctAnswer) {
        button.classList.add("correct");
      }
    });
  }

  // La till en auto advance time för att gå till nästa fråga efter 1.1 sekunder, vi kan ändra tiden senare om vi vill / Ivana
  clearAutoAdvanceTimer();
  autoAdvanceTimer = setTimeout(() => {
    goToNextQuestion();
  }, 1100);
}

function clearAutoAdvanceTimer() {
  if (autoAdvanceTimer) {
    clearTimeout(autoAdvanceTimer);
    autoAdvanceTimer = null;
  }
}

// Funktion som meddelar score.js om svaret var rätt/fel
function notifyScore(isCorrect) {
  const event = new CustomEvent("answerSubmitted", {
    detail: { isCorrect: isCorrect },
  });
  document.dispatchEvent(event);

  console.log(`Event skickat till score.js: isCorrect = ${isCorrect}`);
}

// Funktion för att uppdatera progress dots
function updateProgressDots(currentQuestion) {
  const dots = document.querySelectorAll(".dot");
  dots.forEach((dot, index) => {
    dot.classList.remove("active");
    if (index === currentQuestion) {
      dot.classList.add("active");
    }
  });
}

// Funktion för att gå till nästa fråga
export function goToNextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    displayQuestion();
    updateProgressDots(currentQuestionIndex);
  } else {
    console.log("Quizet är slut, alla frågor visade.");
    showResult();
  }
}

export function resetQuiz() {
  currentQuestionIndex = 0;
  resetGame();
}

export function initQuestionHandlers() {
  const nextBtn = document.getElementById("next-btn");
  if (nextBtn) nextBtn.addEventListener("click", goToNextQuestion);

  const allButtons = document.querySelectorAll(".option-btn");
  allButtons.forEach((button, index) => {
    button.addEventListener("click", () => handleAnswerClick(index));
  });
}

function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.remove("hidden");

  setTimeout(() => {
    toast.classList.add("hidden");
  }, 3000);
}
