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

//Save Progress

//Load Progress

// Open Settings Button
function openAccessibility() {
const container = document.getElementById("settingsContainer");
container.style.display = "block"
}
function closeIframe(){
document.getElementById("settingsContainer").style.display = "none";
}

//Scenes
document.addEventListener("DOMContentLoaded", () => {
    const userInput = document.getElementById("userIn");
    const displayBlock = document.getElementById("displayBlock");

    // Track the user's correct inputs for Task4final scene
    const task4Inputs = new Set(["engine thrusters", "life support", "navigation systems"]);
    const userInputs = new Set();

    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const inputValue = userInput.value.trim();

            // Check for empty input
            if (!inputValue) {
                displayBlock.innerHTML = "Please enter a command!";
                userInput.value = "";
                return;
            }

            // Scene1
            if (window.location.pathname === "/sites/scene1.html") {
                if (inputValue === "go ship") {
                    location.href = "/sites/task4final.html";
                } else {
                    displayBlock.innerHTML = `${inputValue} is an Invalid input!<br>Type 'go ship' to change location!`;
                    userInput.value = "";
                }
            }

            // Task4final Scene
            if (window.location.pathname === "/sites/task4final.html") {
                
                if (task4Inputs.has(inputValue)) {
                    
                    userInputs.add(inputValue);

                    
                    if (userInputs.size === task4Inputs.size) {
                        displayBlock.innerHTML = "YOU HAVE SELECTED THE APPROPRIATE LOCATIONS! <br> THE SHIP IS SAVED!";
                        
                        userInputs.clear();
                    } else {
                        displayBlock.innerHTML = `You've entered: ${Array.from(userInputs).join(", ")}<br>Keep going!`;
                    }
                } else {
                    displayBlock.innerHTML = `${inputValue} is an invalid input!<br>Type one of the provided opotions`;
                }
                
                userInput.value = "";
            }
        }
    });
});

