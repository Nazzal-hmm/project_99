const GAME_TIME = 600; // 10 minutes in seconds

class GameTimer {
    constructor() {
        this.timeLeft = parseInt(localStorage.getItem('timeLeft')) || GAME_TIME;
        this.timerInterval = null;
        this.timerDiv = null;
        this.initialize();
    }

    initialize() {
        this.createTimerDisplay();
        this.startTimer();
        this.setupEventListeners();
    }

    createTimerDisplay() {
        this.timerDiv = document.createElement('div');
        this.timerDiv.id = 'gameTimer';
        this.timerDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 20px;
            color: red;
            font-size: 24px;
            font-weight: bold;
            z-index: 9999;
            background-color: rgba(0, 0, 0, 0.3);
            padding: 10px;
            border-radius: 5px;
        `;
        document.body.appendChild(this.timerDiv);
    }

    startTimer() {
        this.updateDisplay();
        this.timerInterval = setInterval(() => this.updateTimer(), 1000);
    }

    updateTimer() {
        if (this.timeLeft <= 0) {
            this.gameOver();
            return;
        }
        this.timeLeft--;
        localStorage.setItem('timeLeft', this.timeLeft);
        this.updateDisplay();
    }

    updateDisplay() {
        const minutes = Math.floor(this.timeLeft / 60);
        const seconds = this.timeLeft % 60;
        this.timerDiv.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    gameOver() {
        clearInterval(this.timerInterval);
        localStorage.removeItem('timeLeft');
        window.location.href = '../HTML/welcomePage.html';
    }

    setupEventListeners() {
        window.addEventListener('beforeunload', () => {
            localStorage.setItem('timeLeft', this.timeLeft);
        });
    }

    pause() {
        clearInterval(this.timerInterval);
    }

    resume() {
        this.startTimer();
    }

    addTime(seconds) {
        this.timeLeft += seconds;
        localStorage.setItem('timeLeft', this.timeLeft);
        this.updateDisplay();
    }
}

// Initialize timer when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.gameTimer = new GameTimer();
});