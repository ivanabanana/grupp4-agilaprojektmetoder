import { gameState, resetGame } from './score.js';
import { resetQuiz } from './questionHandler.js';

export function initResult() {
    const playAgainBtn = document.getElementById('play-again-btn');

    playAgainBtn.addEventListener('click', function () {

        resetQuiz();
        resetGame();

        const resultScreen = document.getElementById('result-screen');
       resultScreen.className = 'screen';

        const quizScreen = document.getElementById('quiz-screen');
        quizScreen.className = 'screen';

        const startScreen = document.getElementById('start-screen');
        startScreen.className = 'screen-active';

        console.log("startsidan ska nu visas");
        console.log("startscreen classes:", startScreen.className);
    });
}

export function showResult() {
    const resultScreen = document.getElementById('result-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const scoreNumber = document.getElementById('score-number');
    const totalQuestions = document.getElementById('total-questions');
    const badge = document.querySelector('.badge');

        //göm quizsida
        quizScreen.classList.remove('screen-active');
        quizScreen.classList.add('screen');

        //visa resultatsida
        resultScreen.classList.remove('screen');
        resultScreen.classList.add('screen-active');

        //visa slutpoäng
        scoreNumber.textContent = gameState.correctAnswersCount;
        totalQuestions.textContent = 10;

        //visa highscore ifall det är ett nytt rekord
        if (gameState.score > gameState.highScore) {
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }

    }
