class PointSystem {
    constructor() {
        this.taskPoints = {
            'task2': {
                correctAnswers: ['19', '13', '55'],
                pointsPerCorrect: 10,
                nextPage: '../HTML/task2Memory.html'
            }
            // Add other tasks here as needed
        };
    }

    async initializeTask2() {
        const terminal = document.querySelector('.terminal');
        if (!terminal) return;

        terminal.addEventListener('keypress', async (e) => {
            if (e.key === 'Enter') {
                await this.handleTask2Input(terminal.value);
            }
        });
    }

    async handleTask2Input(input) {
        const numbers = input.trim().split(',').map(num => num.trim());
        const messageElement = document.getElementById('message');
        
        if (numbers.length !== 3) {
            messageElement.textContent = 'Please enter three numbers separated by commas';
            return;
        }

        const correctCount = this.calculateCorrectAnswers(numbers, 'task2');
        const points = correctCount * this.taskPoints.task2.pointsPerCorrect;

        await this.updatePoints(points);
    }

    calculateCorrectAnswers(numbers, taskId) {
        let correctCount = 0;
        numbers.forEach((num, index) => {
            if (num === this.taskPoints[taskId].correctAnswers[index]) {
                correctCount++;
            }
        });
        return correctCount;
    }

    async updatePoints(points) {
        // Update local storage
        const currentPoints = parseInt(localStorage.getItem('taskPoints') || '0');
        localStorage.setItem('taskPoints', currentPoints + points);

        try {
            const username = localStorage.getItem('username');
            const response = await fetch('../PHP/updatePoints.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    points: points
                })
            });

            const data = await response.json();
            if (data.success) {
                window.location.href = this.taskPoints.task2.nextPage;
            }
        } catch (error) {
            console.error('Error updating points:', error);
        }
    }
}

// Initialize the point system when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const pointSystem = new PointSystem();
    pointSystem.initializeTask2();
});