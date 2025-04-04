let currentAlignment = 0.0; // Start at 0
let gameActive = true;

// Initialize game
function initGame() {
    document.getElementById('thrust-slider').addEventListener('input', updateDisplay);
    updateDisplay({ target: document.getElementById('thrust-slider') }); 
}

function updateDisplay(e) {
    currentAlignment = parseFloat(e.target.value).toFixed(1);
    document.getElementById('current-alignment').textContent = `${currentAlignment}°`;
}

async function submitAlignment() {
    if (!gameActive) return;

    const success = currentAlignment >= 1.0 && currentAlignment <= 1.4;
    
    if (success) {
        document.getElementById('current-alignment').style.color = '#00ff00';
        document.querySelector('.slider').style.borderColor = '#00ff00';
        gameActive = false;
        
        try {
            await updatePoints(10); // Award 10 points for correct answer
            if (confirm('Alignment successful! Continue to the Next task?')) {
                window.location.href = '../HTML/TT3.html';
            }
        } catch (error) {
            console.error('Error updating points:', error);
            // Still continue even if points update fails
            if (confirm('Alignment successful! Continue to the Next task?')) {
                window.location.href = '../HTML/TT3.html';
            }
        }
    } else {
        document.getElementById('current-alignment').style.color = '#ff5555';
        setTimeout(() => {
            document.getElementById('current-alignment').style.color = '#00ff9d';
        }, 1000);
    }
}

        initGame();
