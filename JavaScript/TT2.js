let currentAlignment = 0.0; // Start at 0
        let timeLeft = 30;
        let timerInterval;
    
        // Initialize game
        function initGame() {
            timerInterval = setInterval(updateTimer, 1000);
            document.getElementById('thrust-slider').addEventListener('input', updateDisplay);
            updateDisplay({ target: document.getElementById('thrust-slider') }); 
        }
    
        function updateTimer() {
            timeLeft--;
            document.getElementById('time').textContent = timeLeft;
    
            if (timeLeft <= 0) {
                handleFailure();
            }
        }
    
        function updateDisplay(e) {
            currentAlignment = parseFloat(e.target.value).toFixed(1);
            document.getElementById('current-alignment').textContent = `${currentAlignment}°`;
        }
    
        function submitAlignment() {
            if (timeLeft <= 0) return;
    
            const success = currentAlignment >= 1.0 && currentAlignment <= 1.4;
            
            if (success) {
                document.getElementById('current-alignment').style.color = '#00ff00';
                document.querySelector('.slider').style.borderColor = '#00ff00';
                
                if (confirm('Alignment successful! Continue to the Next task?')) {
                    window.location.href = '../HTML/TT3.html';
                }
            } else {
                document.getElementById('current-alignment').style.color = '#ff5555';
                setTimeout(() => {
                    document.getElementById('current-alignment').style.color = '#00ff9d';
                }, 1000);
            }
        }
    
        function handleFailure() {
            clearInterval(timerInterval);
            alert('Mission Failed! Time expired');
            document.querySelector('.slider').style.borderColor = '#ff0000';
            document.getElementById('current-alignment').style.color = '#ff0000';
        }
        initGame();