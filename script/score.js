/* Här är själva logiken för att räkna poäng, jag lade även till en "local storage" för att 
spara poängen samt en streak om man svarar rätt på flera frågor i rad. Sanel*/
let gameState = {
    score: 0,
    streak: 0,
    correctAnswersCount: 0,
    highScore: localStorage.getItem('quiz_highscore') || 0
};

export const updateScore = (isCorrect) => {
    if (!isCorrect) {
        gameState.streak = 0;
    } else {
        gameState.streak++;
        gameState.correctAnswersCount++;
    }

    const points = (isCorrect && gameState.streak >= 3) ? 20 : 10;
    if (isCorrect) {
        gameState.score += points;
    }

    saveToLocalStorage();
    return gameState;
};

export const getFeedbackStyle = (isCorrect) => {
    return {
        backgroundColor: isCorrect ? "#2ecc71" : "#e74c3c",
        color: "white"
    };
};

const saveToLocalStorage = () => {
    localStorage.setItem('quiz_current_score', gameState.score);
    
    if (gameState.score > gameState.highScore) {
        gameState.highScore = gameState.score;
        localStorage.setItem('quiz_highscore', gameState.highScore);
    }
};

export const resetGame = () => {
    gameState.score = 0;
    gameState.streak = 0;
    gameState.correctAnswersCount = 0;
    localStorage.removeItem('quiz_current_score');
    localStorage.removeItem('quiz_streak');
};


