// turbo_p1.js
document.addEventListener('DOMContentLoaded', () => {
  // Game State
  const TARGET_PRESSURE = 125; // Can change to 126 if you want two correct answers
  let currentPressure = 89;
  let timeLeft = 30;
  let timerInterval;
  let gameActive = true;

  // DOM Elements
  const pressureReadout = document.querySelector('.pressure-readout');
  const terminalOutput = document.getElementById('terminal-output');
  const timeDisplay = document.getElementById('time');
  const playerInput = document.getElementById('player-input');

  // Initialize game
  function initGame() {
      timerInterval = setInterval(updateTimer, 1000);
      addSystemMessage('FUEL PRESSURE CRITICAL - FIND STABLE PRESSURE (120-130 range)');
      addSystemMessage('Input PSI values to find correct pressure');
  }

  function updateTimer() {
      if (!gameActive) return;
      
      timeLeft--;
      timeDisplay.textContent = timeLeft;

      if (timeLeft <= 0) {
          handleFailure();
          addSystemMessage('MISSION FAILED: Time expired', 'error-message');
      }
  }

  function handleFailure() {
      gameActive = false;
      clearInterval(timerInterval);
      playerInput.disabled = true;
      alert('Mission Failed! You ran out of time.');
  }

  function handleSuccess() {
      gameActive = false;
      clearInterval(timerInterval);
      playerInput.disabled = true;
      
      // Show popup
      if (confirm('Pressure stabilized! Continue to next task?')) {
          window.location.href = '../HTML/TT2.html';
      }
  }

  function addSystemMessage(text, className = 'system-message') {
      const message = document.createElement('div');
      message.className = `${className} typewriter`;
      message.textContent = text;
      terminalOutput.appendChild(message);
      terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Handle commands
  window.handleCommand = function() {
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

      currentPressure = psi;
      pressureReadout.textContent = `CURRENT PRESSURE: ${psi} PSI`;

      if (psi === TARGET_PRESSURE || psi === 126) { // For two correct answers
          pressureReadout.style.color = '#00ff00';
          pressureReadout.style.animation = 'none';
          handleSuccess();
      } else if (psi > TARGET_PRESSURE) {
          addSystemMessage(`That level of pressure TOO HIGH! (${psi} PSI) - Try lower value:`, 'error-message');
      } else {
          addSystemMessage(`That level of pressure TOO LOW! (${psi} PSI) - Try Higher value:`, 'error-message');
      }
  };

  // Enter key handler
  playerInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') handleCommand();
  });

  // Start the game
  initGame();
});