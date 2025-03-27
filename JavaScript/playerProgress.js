// Player Progress Management
let playerPoints = 0;

// Function to update points and navigate based on task
function updatePoints(task, correctAnswer) {
    switch (task) {
        case 'Task2intro':
            if (correctAnswer) {
                playerPoints += 1;
            }
            break;
        case 'Task4':
            if (correctAnswer === 'engine' || correctAnswer === 'life support' || correctAnswer === 'navigation') {
                playerPoints += 1;
            }
            window.location.href = 'task4Memory.html';
            break;
        case 'Nztask3':
            if (correctAnswer === 'firstTry') {
                playerPoints += 2;
            } else if (correctAnswer === 'secondTry') {
                playerPoints += 1;
            }
            break;
        case 'Caesar':
            if (correctAnswer === 'light') {
                playerPoints += 1;
                window.location.href = 'starwars.html';
            } else if (correctAnswer === 'space') {
                playerPoints += 2;
                window.location.href = 'starwars.html';
            }
            break;
        case 'TT1':
        case 'TT2':
        case 'TT3':
            playerPoints += 1;
            break;
        default:
            console.log('Unknown task');
    }
    console.log(`Current Points: ${playerPoints}`);
}

// Example usage
// updatePoints('Task2intro', true);
// updatePoints('Task4', 'engine');
// updatePoints('Nztask3', 'firstTry');
// updatePoints('Caesar', 'light');