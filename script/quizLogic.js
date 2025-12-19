import { questions } from "./questions.js";

export function checkAnswer(questionIndex, selectedAnswer) {
  const question = questions[questionIndex];

  if (!question) return false;

  return question.correctAnswer === selectedAnswer;
}
