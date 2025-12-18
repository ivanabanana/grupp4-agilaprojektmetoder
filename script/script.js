const startBtn = document.getElementById('start-btn')
const startScreen = document.getElementById('start-screen')
const quizScreen = document.getElementById('quiz-screen')
const currentScore = document.getElementById('currentScore')

function startQuiz() {
    //göm startsida
    startScreen.classList.remove('screen-active');
    startScreen.classList.add('screen');

    //visa quizsida
    quizScreen.classList.remove('screen');
    quizScreen.classList.add('screen-active');
}

currentScore.textContent = '0';

//knappfunktion
startBtn.addEventListener('click', startQuiz);

