import { displayQuestion, resetQuiz } from "./questionHandler.js"; // Maryam

export function initStart() {
  const startBtn = document.getElementById("start-btn");

  //knappfunktion
  startBtn.addEventListener("click", startQuiz);
}

export function startQuiz() {
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const currentScore = document.getElementById("current-score");

  //göm startsida
  startScreen.classList.remove("screen-active");
  startScreen.classList.add("screen");

  //visa quizsida
  quizScreen.classList.remove("screen");
  quizScreen.classList.add("screen-active");

  //poängen nollställs
  currentScore.textContent = "0";

  // MARYAM: Återställer quiz och visar första frågan
  resetQuiz();
  displayQuestion();
}
