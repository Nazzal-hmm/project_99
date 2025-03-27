document.addEventListener('DOMContentLoaded', () => {
  // Initialize variables
  let timeLeft = 30;
  let timerInterval;
  let gameActive = true;

  // Create timer element
  const timerDiv = document.createElement('div');
  timerDiv.className = 'timer';
  timerDiv.style.textAlign = 'center';
  timerDiv.style.fontSize = '1.5em';
  timerDiv.style.marginBottom = '10px';
  document.querySelector('.game-terminal').prepend(timerDiv);

  // Timer function
  function updateTimer() {
      timerDiv.textContent = `Time Remaining: ${timeLeft}s`;
      
      if (timeLeft > 0) {
          timeLeft--;
      } else {
          clearInterval(timerInterval);
          gameActive = false;
          document.getElementById('boost-code').disabled = true;
          alert('Time is up! Mission failed.');
      }
  }

  // Start timer
  timerInterval = setInterval(updateTimer, 1000);
  updateTimer();

  // Code validation function
  window.validateCode = function() {
      if (!gameActive) return;

      const codeInput = document.getElementById('boost-code');
      const correctCode = '23024517';
      
      if (codeInput.value === correctCode) {
          codeInput.classList.remove('incorrect');
          codeInput.classList.add('success');
          clearInterval(timerInterval);
          window.location.href = 'loadingPage.html';
      } else if (codeInput.value.length === 8) {
          codeInput.classList.remove('success');
          codeInput.classList.add('incorrect');
          setTimeout(() => {
              codeInput.classList.remove('incorrect');
          }, 1000);
      }
  };
});