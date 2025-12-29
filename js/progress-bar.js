// PROGRESS BAR för att lägga till class på dots (Maryam)

function updateProgressbar(currentQuestionIndex) {
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
export { updateProgressbar };