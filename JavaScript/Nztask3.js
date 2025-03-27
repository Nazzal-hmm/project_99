//Create Account    
document.addEventListener("DOMContentLoaded", function () {
  sessionStorage.clear();
  document.querySelector(".container").addEventListener("submit", function (event) {
      event.preventDefault();

      let username = document.getElementById("username").value;
      let password=document.getElementById("password").value;
      
      sessionStorage.setItem("username", username);
      sessionStorage.setItem("password",password);

      window.location.href = "../sites/scene1.html";
  });
});

const SCROLLER_LENGTH = 5; 
const HEIGHT = 5;
const FPS = 10;


document.addEventListener("DOMContentLoaded", () => {
  const containers = document.querySelectorAll('.containers4');
  containers.forEach((container, index) => {
      const wrapper = container.querySelector('.led-grid-wrapper');
      wrapper.innerHTML = ''; // Clear any previous lights
  
      for (let row = 0; row < HEIGHT; row++) {
          for (let col = 0; col < SCROLLER_LENGTH; col++) {
              const light = document.createElement('div');
              light.className = `light light-${row}-${col} off`;
              wrapper.appendChild(light);
          }
      }
  
      const initialChar = index === 0 ? 'U' : 'D';
      animateLED(wrapper, textToLED(initialChar));
  
      
      const upArrow = container.querySelector('.arrow-up-container');
      const downArrow = container.querySelector('.arrow-down-container');
  
      upArrow.addEventListener('click', () => updateDisplay(wrapper, 'U'));
      downArrow.addEventListener('click', () => updateDisplay(wrapper, 'D'));
  });
});

function updateDisplay(container, char) {
  const doorSound = document.getElementById('doorSound');
  doorSound.play();
  animateLED(container, textToLED(char));
}

function animateLED(container, ledPattern) {
  const lights = container.querySelectorAll('.light');
  lights.forEach((light, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      if (ledPattern[col] && ledPattern[col][row] === 1) {
          light.classList.remove('off');
          light.classList.add('on');
      } else {
          light.classList.remove('on');
          light.classList.add('off');
      }
  });
}

function textToLED(char) {
  const charMap = {
      'U': [
          [1,1,1,1,0],
          [0,0,0,0,1],
          [0,0,0,0,1],
          [0,0,0,0,1],
          [1,1,1,1,0]
      ],
      'D': [
          [1,1,1,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,0],
          [0,0,0,0,0]
      ]
  };

  return charMap[char] || Array.from({ length: 5 }, () => Array(5).fill(0));
}

document.addEventListener("DOMContentLoaded", () => {
  let userInput = document.getElementById("userIn");
  let displayBlock = document.getElementById("displayBlock");
  
 
  const CORRECT_COMBINATION = ['U', 'D', 'U', 'D', 'U'];
  let currentCombination = [];
  let previousCombinations = [];
  let tryCount = 0;
  const MAX_TRIES = 5;
  let gameEnded = false;

 
  function initializeLEDDisplays() {
      const containers = document.querySelectorAll('.containers4');
      containers.forEach(container => {
          const lights = container.querySelectorAll('.light');
          lights.forEach(light => {
              light.classList.remove('off');
              light.classList.add('on');
          });
          container.style.borderColor = 'greenyellow';
      });
  }

  
  function updateContainersDisplay(status, checkResult = []) {
      const containers = document.querySelectorAll('.containers4');
      containers.forEach((container, index) => {
          const lights = container.querySelectorAll('.light');
          const wrapper = container.querySelector('.led-grid-wrapper');
          
          if (status === 'check') {
              
              if (previousCombinations.length > 0) {
                  const latestCombo = previousCombinations[previousCombinations.length - 1];
                  
                  if (latestCombo[index]) {
                      animateLED(wrapper, textToLED(latestCombo[index]));
                      
                      if (checkResult[index]) {
                          container.style.borderColor = 'green';
                          lights.forEach(light => {
                              light.classList.remove('wrong-light');
                              light.classList.add('correct-light');
                          });
                      } else {
                          container.style.borderColor = 'red';
                          lights.forEach(light => {
                              light.classList.remove('correct-light');
                              light.classList.add('wrong-light');
                          });
                      }
                  }
              }
          } else if (status === 'success') {
              container.style.borderColor = 'green';
              lights.forEach(light => {
                  light.classList.remove('wrong-light');
                  light.classList.add('correct-light');
              });
          } else if (status === 'failure') {
              container.style.borderColor = 'red';
              lights.forEach(light => {
                  light.classList.remove('correct-light');
                  light.classList.add('wrong-light');
              });
          }
      });
  }

 
  const containers = document.querySelectorAll('.containers4');
  containers.forEach((container, index) => {
      const upArrow = container.querySelector('.arrow-up-container');
      const downArrow = container.querySelector('.arrow-down-container');
  
      upArrow.addEventListener('click', () => {
          if (!gameEnded) {
              recordCombinationChoice('U', container, index);
          }
      });
      
      downArrow.addEventListener('click', () => {
          if (!gameEnded) {
              recordCombinationChoice('D', container, index);
          }
      });
  });

  
  function recordCombinationChoice(choice, container, index) {
      
      while (currentCombination.length <= index) {
          currentCombination.push(null);
      }
      
      
      currentCombination[index] = choice;
      
      
      const wrapper = container.querySelector('.led-grid-wrapper');
      updateDisplay(wrapper, choice);
  }

  
  userInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
          let inputValue = userInput.value.trim().toLowerCase();

          if (inputValue === "lock in") {
              
              if (gameEnded) {
                  displayBlock.innerHTML = "Game has ended. Restart to play again.";
                  userInput.value = "";
                  return;
              }

              
              const isComplete = currentCombination.length === CORRECT_COMBINATION.length && 
                  !currentCombination.includes(null);

              if (!isComplete) {
                  displayBlock.innerHTML = "Complete the entire combination first!";
                  userInput.value = "";
                  return;
              }

              
              previousCombinations.push([...currentCombination]);

              
              const checkResult = currentCombination.map((choice, index) => 
                  choice === CORRECT_COMBINATION[index]
              );
              
              tryCount++;

             
              const isFullyCorrect = checkResult.every(result => result);

              if (isFullyCorrect) {
                  updateContainersDisplay('success');
                  displayBlock.innerHTML = "Correct combination! Congratulations!";
                  window.location.href="../HTML/memory3.html"
                  gameEnded = true;
              } else {
                  updateContainersDisplay('check', checkResult);
                  
                  if (tryCount >= MAX_TRIES) {
                      updateContainersDisplay('failure');
                      displayBlock.innerHTML = `Game Over! Try again}`;
                      gameEnded = true;
                  } else {
                      const correctCount = checkResult.filter(Boolean).length;
                      displayBlock.innerHTML = `Partial match! ${correctCount} correct. Attempt ${tryCount} of ${MAX_TRIES}`;
                  }
              }

              
              userInput.value = "";
          } else {
              displayBlock.innerHTML = "Type 'lock in' to submit your combination!";
              userInput.value = "";
          }
      }
  });

  
  initializeLEDDisplays();
});