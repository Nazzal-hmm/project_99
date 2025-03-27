// Game Timer - 10 minute time slice implementation
const GAME_TIME_LIMIT = 10 * 60; // 10 minutes in seconds
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

// Initialize the timer when the DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Create timer display if it doesn't exist
    if (!document.getElementById('game-timer')) {
        createTimerDisplay();
    }
    
    timerElement = document.getElementById('timer-display');
    
    // Check if timer already exists in session storage
    if (sessionStorage.getItem('gameTimeRemaining')) {
        timeRemaining = parseInt(sessionStorage.getItem('gameTimeRemaining'));
    } else {
        sessionStorage.setItem('gameTimeRemaining', timeRemaining);
    }
    
    // Start the timer
    startTimer();
    
    // Track current page in session storage
    sessionStorage.setItem('currentPage', currentPage);
});

// Create timer display
function createTimerDisplay() {
    const timerContainer = document.createElement('div');
    timerContainer.id = 'game-timer';
    timerContainer.innerHTML = `
        <div class="timer-wrapper">
            <div id="timer-display">10:00</div>
        </div>
    `;
    
    // Add CSS for the timer
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

// Start the timer
function startTimer() {
    updateTimerDisplay();
    
    timerInterval = setInterval(function() {
        if (!isTimerPaused) {
            timeRemaining--;
            sessionStorage.setItem('gameTimeRemaining', timeRemaining);
            
            updateTimerDisplay();
            
            // Check if time is running out (less than 1 minute)
            if (timeRemaining < 60) {
                timerElement.classList.add('timer-warning');
            }
            
            // Check if time is up
            if (timeRemaining <= 0) {
                clearInterval(timerInterval);
                gameOver();
            }
        }
    }, 1000);
}

// Update the timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    timerElement.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Pause the timer (can be called during cutscenes or dialogues)
function pauseTimer() {
    isTimerPaused = true;
}

// Resume the timer
function resumeTimer() {
    isTimerPaused = false;
}

// Game over function
function gameOver() {
    // Save any necessary game state
    sessionStorage.setItem('gameResult', 'timeout');
    
    // Redirect to game over page
    window.location.href = '../HTML/welcomePage.html';
}

// Add time to the timer (can be used as rewards)
function addTime(seconds) {
    timeRemaining += seconds;
    sessionStorage.setItem('gameTimeRemaining', timeRemaining);
    updateTimerDisplay();
}

// Save game progress when navigating between pages
window.addEventListener('beforeunload', function() {
    sessionStorage.setItem('gameTimeRemaining', timeRemaining);
});

// Function to check if player has completed all required tasks
function checkGameCompletion() {
    // This would be implemented based on your game's specific completion criteria
    // For example, checking if certain tasks are completed in the database
    
    // For demonstration purposes:
    const requiredTasks = ['task2', 'task3', 'task4'];
    const completedTasks = JSON.parse(sessionStorage.getItem('completedTasks') || '[]');
    
    const allTasksCompleted = requiredTasks.every(task => completedTasks.includes(task));
    
    if (allTasksCompleted) {
        // Redirect to success page
        window.location.href = '../HTML/gameSuccess.html';
    }
}

// Export functions for use in other scripts
window.gameTimer = {
    pause: pauseTimer,
    resume: resumeTimer,
    addTime: addTime,
    checkCompletion: checkGameCompletion
};