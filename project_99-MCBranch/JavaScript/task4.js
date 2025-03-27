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
    const userInputs = new Set();
    userInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            const inputValue = userInput.value.toLowerCase().trim();
            
            // Check for empty input
            if (!inputValue) {
                displayBlock.innerHTML = "Please enter a command!";
                userInput.value = "";
                return;
            }

            // Scene1
            if (window.location.pathname === "../HTML/task4scene1.html") {
                
                if (inputValue === "go ship") {
                    location.href = "/HTML/task4.html";
                } else {
                    displayBlock.innerHTML = `${inputValue} is an Invalid input!<br>Type 'go ship' to change location!`;
                    userInput.value = "";
                }
            }
            const task4Inputs=["engine thrusters", "life support", "navigation systems"];
            
            // Task4final Scene
            if (window.location.pathname === "/HTML/task4.html") {
               
                if (task4Inputs.includes(inputValue)) {
                    
                    userInputs.add(inputValue);
                    
                    
                    if (userInputs.size === task4Inputs.length) {
                        displayBlock.innerHTML = "YOU HAVE SELECTED THE APPROPRIATE LOCATIONS! <br> THE SHIP IS SAVED! <br> Type CONTINUE";
                        
                        window.location.href="../HTML/task4Memory.html"
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