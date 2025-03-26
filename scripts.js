// Add a subtle shake effect to simulate spacecraft trembling
document.addEventListener('DOMContentLoaded', function() {
    // Random flicker effect for the background
    setInterval(function() {
        const background = document.querySelector('.background');
        background.style.opacity = (Math.random() * 0.2 + 0.2).toFixed(2);
    }, 500);
});

function startOxygenTask() {
    // Log to check if the function is being triggered
    console.log('Continue button clicked!');
    
    // Save any state if needed
    localStorage.setItem('currentTask', 'oxygen');
    
    // Navigate to the oxygen task page
    window.location.href = 'oxygen-task.html';
}
