document.addEventListener('DOMContentLoaded', () => {
    const choiceContainer = document.querySelector('.choice-container');

    // Show choice container 15 seconds earlier (27s) after the crawl animation starts
    setTimeout(() => {
        choiceContainer.style.display = "block";
    }, 27000); // 27s for 15 seconds earlier than before

    // Button click event handlers
    document.getElementById("yes-button").onclick = function() {
        window.location.href = "#"; // Change this to the actual destination later
    };

    document.getElementById("no-button").onclick = function() {
        window.location.href = "#"; // Change this to the actual destination later
    };
});