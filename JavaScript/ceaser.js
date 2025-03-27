const inputText = document.getElementById("inputText");
const shiftSlider = document.getElementById("shiftSlider");
const shiftValue = document.getElementById("shiftValue");
const outputText = document.getElementById("outputText");
const inputTextAnswer = document.getElementById("inputTextAnswer");

let attempts = 0; // Track the number of attempts
let hasSubmitted = false; // Track if user has already submitted

shiftSlider.addEventListener("input", function () {
    let shift = parseInt(shiftSlider.value);
    shiftValue.textContent = shift;
    unscrambleText();
});

inputText.addEventListener("input", unscrambleText);

inputTextAnswer.addEventListener("keydown", function (event) {
    if (event.key === "Enter" && attempts < 3 && !hasSubmitted) {
        event.preventDefault();
        const userAnswer = inputTextAnswer.value.trim().toUpperCase();
        if (userAnswer) {
            if (checkAnswer(userAnswer)) {
                showConfirmation(userAnswer);
                inputTextAnswer.value = "";
                inputTextAnswer.disabled = true; // Disable input after first entry
                hasSubmitted = true;
            } else {
                attempts++;
                if (attempts < 3) {
                    showError(`Incorrect answer! You have ${3 - attempts} attempt(s) left.`);
                } else {
                    inputTextAnswer.disabled = true; // Disable input after 3 failed attempts
                    showError("You have reached the maximum number of attempts.");
                }
            }
        }
    }
});

function checkAnswer(userAnswer) {
    // Replace with the logic to check if the answer is correct
    // Example: correct answers could be "LIGHT" or "SPACE"
    return userAnswer === "LIGHT" || userAnswer === "SPACE";
}

function showConfirmation(userAnswer) {
    const enterAnswerDiv = document.querySelector(".enterAnswer");
    
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = "Input Accepted: " + userAnswer;
    confirmationMessage.classList.add("confirmation-message");

    const nextPageButton = document.createElement("button");
    nextPageButton.textContent = "Proceed to Next Page";
    nextPageButton.classList.add("next-page-button");

    nextPageButton.addEventListener("click", function () {
        window.location.href = "next-page.html";
    });

    enterAnswerDiv.appendChild(confirmationMessage);
    enterAnswerDiv.appendChild(nextPageButton);
}

function showError(message) {
    const enterAnswerDiv = document.querySelector(".enterAnswer");

    // Remove any previous error message if it exists
    const existingError = document.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }

    // Create a new error message
    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red"; // Set the color to red

    enterAnswerDiv.appendChild(errorMessage);
}

function unscrambleText() {
    let text = inputText.value.toUpperCase();
    let shift = parseInt(shiftSlider.value);
    let result = "";

    if (text === "HZBUZ") {
        if (shift === 7) {
            result = "LIGHT";
        } else if (shift === 14) {
            result = "SPACE";
        } else {
            result = shiftText(text, shift);
        }
    } else {
        result = shiftText(text, shift);
    }

    outputText.textContent = result || "Unscrambled text will appear here";
}

function shiftText(text, shift) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
        let char = text[i];
        if (char.match(/[A-Z]/)) {
            let code = text.charCodeAt(i);
            let shiftedCode = ((code - 65 - shift + 26) % 26) + 65;
            result += String.fromCharCode(shiftedCode);
        } else {
            result += char;
        }
    }
    return result;
}

unscrambleText();
