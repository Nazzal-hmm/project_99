document.addEventListener('DOMContentLoaded', () => {
    const choiceContainer = document.querySelector('.choice-container');
  
    setTimeout(() => {
        choiceContainer.style.display = "block";
    }, 27000); 
    
    document.getElementById("yes-button").onclick = function() {
        window.location.href = "../HTML/Tstart.html"; 
    };
  
    document.getElementById("no-button").onclick = function() {
        window.location.href = "../HTML/TimeEnding.html"; 
    };
  });