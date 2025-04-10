// turbo_p1.js
document.addEventListener('DOMContentLoaded', () => {
    let gameActive = true;
  
    // DOM Elements
    const pressureReadout = document.querySelector('.pressure-readout');
    const terminalOutput = document.getElementById('terminal-output');
    const playerInput = document.getElementById('player-input');
  
    // Initialize game
    function initGame() {
        addSystemMessage('FUEL PRESSURE CRITICAL - FIND STABLE PRESSURE (120-130 range)');
        addSystemMessage('Input PSI values to find correct pressure');
    }
  
    function addSystemMessage(text, className = 'system-message') {
        const message = document.createElement('div');
        message.className = `${className} typewriter`;
        message.textContent = text;
        terminalOutput.appendChild(message);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }
  
    // Handle commands
    window.handleCommand = async function() {
        if (!gameActive) return;
  
        const input = playerInput.value.trim();
        playerInput.value = '';
        
        if (!input) return;
  
        // Add player input to terminal
        addSystemMessage(`> ${input}`, 'player-command');
  
        // Process input
        const psi = parseInt(input);
        
        if (isNaN(psi)) {
            addSystemMessage('INVALID INPUT: Numbers only', 'error-message');
            return;
        }
  
        pressureReadout.textContent = `CURRENT PRESSURE: ${psi} PSI`;
  
        if (psi >= 120 && psi <= 130) {
            pressureReadout.style.color = '#00ff00';
            pressureReadout.style.animation = 'none';
            gameActive = false;
            playerInput.disabled = true;
            
            try {
                await updatePoints(10);
                if (confirm('Pressure stabilized! Continue to next task?')) {
                    window.location.href = '../HTML/TT2.html';
                }
            } catch (error) {
                console.error('Error updating points:', error);
                if (confirm('Pressure stabilized! Continue to next task?')) {
                    window.location.href = '../HTML/TT2.html';
                }
            }
        } else {
            addSystemMessage('Pressure must be between 120-130 PSI. Try again:', 'error-message');
        }
    };
  
    // Enter key handler
    playerInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleCommand();
    });
  
    // Start the game
    initGame();
});
