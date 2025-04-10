const GAME_TIME_LIMIT = 10 * 60; 
let timeRemaining = GAME_TIME_LIMIT;
let timerInterval;
let timerElement;
let isTimerPaused = false;
let currentPage = window.location.pathname.split('/').pop();

// Game progression tracking
const gameStages = [
    'loadingPage.html',
    'Corridor1.html',
    'Starting2.html',
    'Daddy flashback.html',
    'Caution 2.html',
    'Task2intro.html',
    'task2Memory.html',
    'Task4.html',
    'task4Memory.html',
    'Nztask3.html',
    'Memory3.html',
    'caesarEntry.html',
    'Caesar.html',
    'Starwars.html'
];


document.addEventListener('DOMContentLoaded', function() {
 
    if (!document.getElementById('game-timer')) {
        createTimerDisplay();
    }
    
    timerElement = document.getElementById('timer-display');
    

    if (sessionStorage.getItem('gameTimeRemaining')) {
        timeRemaining = parseInt(sessionStorage.getItem('gameTimeRemaining'));
    } else {
        sessionStorage.setItem('gameTimeRemaining', timeRemaining);
    }
    
 
    startTimer();
    
   
    sessionStorage.setItem('currentPage', currentPage);
});


function createTimerDisplay() {
    const timerContainer = document.createElement('div');
    timerContainer.id = 'game-timer';
    timerContainer.innerHTML = `
        <div class="timer-wrapper">
            <div id="timer-display">10:00</div>
        </div>
    `;
    

    const timerStyle = document.createElement('style');
    timerStyle.textContent = `
        #game-timer {
            position: fixed;
            top: 20px;
            left: 20px;
            z-index: 9999;
        }
        .timer-wrapper {
            background-color: rgba(0, 0, 0, 0.7);
            color: #ff0000;
            padding: 10px 15px;
            border-radius: 5px;
            font-family: 'Courier New', monospace;
            font-size: 24px;
            font-weight: bold;
        }
        .timer-warning {
            animation: pulse 1s infinite;
        }
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    `;
    
    document.head.appendChild(timerStyle);
    document.body.appendChild(timerContainer);
}


function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(function() {
        if (!isTimerPaused) {
            timeRemaining--;
            sessionStorage.setItem('gameTimeRemaining', timeRemaining);
            
            updateTimerDisplay();
            
            
            if (timeRemaining < 60) {
                timerElement.classList.add('timer-warning');
            }
            
          
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                gameOver();
            }
        }
    }, 1000);
}


function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}



function gameOver() {
    sessionStorage.setItem('gameResult', 'timeout');

    window.location.href = '../HTML/ending1.html';
}



