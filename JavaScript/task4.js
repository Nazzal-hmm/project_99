document.addEventListener("DOMContentLoaded", async () => {
    await updateCurrentSession()
    
    let userInput = document.getElementById("userIn")
    let displayBlock = document.getElementById("displayBlock")
    let userInputs = new Set()
    
    let targetSystems = new Set([
        "engine thrusters",
        "life support",
        "navigation systems"
    ])

    userInput.addEventListener("keydown", async (e) => {
        if (e.key == "Enter") {
            let inputValue = userInput.value.toLowerCase().trim()
            
            if (!inputValue) {
                displayBlock.innerHTML = "Please enter a command!"
                userInput.value = ""
                return
            }

            let validInputs = [
                "engine thrusters",
                "life support",
                "communication systems",
                "shielding systems",
                "medical bay",
                "navigation systems"
            ]

            if (validInputs.includes(inputValue)) {
                if (!userInputs.has(inputValue)) {
                    userInputs.add(inputValue)
                    
                    if (targetSystems.has(inputValue)) {
                        try {
                            await updatePoints(10)
                        } catch (error) {
                            console.error('Error updating points:', error)
                        }
                    }
                    
                    displayBlock.innerHTML = "Selected: " + Array.from(userInputs).join(", ") + "<br>" + (3 - userInputs.size) + " selections remaining"
                    
                    if (userInputs.size == 3) {
                    window.location.href = '../HTML/task4Memory.html'
                    }
                } else {
                    displayBlock.innerHTML = "You've already selected that system!"
                }
            } else {
                displayBlock.innerHTML = "Invalid system name!"
            }
            
            userInput.value = ""
        }
    })

});

function openAccessibility() {
    let container = document.getElementById("settingsContainer")
    container.style.display = "block"
}

function closeIframe() {
    document.getElementById("settingsContainer").style.display = "none"
}
