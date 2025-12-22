//resultatssida

export function initResult() {
    const resultScreen = document.getElementById('result-screen')
    const quizScreen = document.getElementById('quiz-screen')
    const scoreNumber = document.getElementById('score-number')
    const totalQuestions = document.getElementById('total-questions')
    const badge = document.querySelector('.badge')
    const playAgainBtn = document.getElementById('play-again-btn')

    function quizResult() {
        //göm quizsida
        quizScreen.classList.remove('screen-active');
        quizScreen.classList.add('screen');

        //visa resultatsida
        resultScreen.classList.remove('screen');
        resultScreen.classList.add('screen-active');

        //visa slutpoäng
        scoreNumber.textContent = gameState.score;
        totalQuestions.textContent = 10;

        //visa highscore ifall det är ett nytt rekord
        if (gameState.score > gameState.highScore) {
            badge.style.display = 'block';
        } else {
            badge.style.display = 'none';
        }

    }

    //knappfunktion för att gå tillbaka till startsida
    playAgainBtn.addEventListener('click', function () {
        location.reload();
    });
}