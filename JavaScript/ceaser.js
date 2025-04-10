document.addEventListener('DOMContentLoaded', function() {
    const inputText = document.getElementById("inputText");
    const shiftSlider = document.getElementById("shiftSlider");
    const shiftValue = document.getElementById("shiftValue");
    const outputText = document.getElementById("outputText");
    const inputTextAnswer = document.getElementById("inputTextAnswer");

    let hasSubmitted = false;

  
    inputText.value = "HZBUZ";

  
    shiftSlider.addEventListener("input", function() {
    
        const shift = parseInt(this.value);
   
        shiftValue.textContent = shift;
    
        unscrambleText();
    });

    inputText.addEventListener("input", unscrambleText);

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
                let shiftedCode = ((code - 65 + shift) % 26);
                if (shiftedCode < 0) shiftedCode += 26;
                shiftedCode += 65;
                result += String.fromCharCode(shiftedCode);
            } else {
                result += char;
            }
        }
        return result;
    }

    inputTextAnswer.addEventListener("keydown", function(event) {
        if (event.key === "Enter" && !hasSubmitted) {
            event.preventDefault();
            const userAnswer = inputTextAnswer.value.trim().toUpperCase();
            if (userAnswer) {
                if (checkAnswer(userAnswer)) {
                    showConfirmation(userAnswer);
                    inputTextAnswer.value = "";
                    inputTextAnswer.disabled = true;
                    hasSubmitted = true;
                } else {
                    showError("Incorrect answer! Try again.");
                }
            }
        }
    });

 
    unscrambleText();

    shiftValue.textContent = shiftSlider.value;
});

function showConfirmation(userAnswer) {
    const enterAnswerDiv = document.querySelector(".enterAnswer");
    
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = "Input Accepted: " + userAnswer;
    confirmationMessage.classList.add("confirmation-message");

    const nextPageButton = document.createElement("button");
    nextPageButton.textContent = "Proceed to Next Page";
    nextPageButton.classList.add("next-page-button");

    nextPageButton.addEventListener("click", function() {
        window.location.href = "../HTML/StarWars.html";
    });

    enterAnswerDiv.appendChild(confirmationMessage);
    enterAnswerDiv.appendChild(nextPageButton);
}

function showError(message) {
    const enterAnswerDiv = document.querySelector(".enterAnswer");

    const existingError = document.querySelector(".error-message");
    if (existingError) {
        existingError.remove();
    }

    const errorMessage = document.createElement("p");
    errorMessage.textContent = message;
    errorMessage.classList.add("error-message");
    errorMessage.style.color = "red";

    enterAnswerDiv.appendChild(errorMessage);
}

function checkAnswer(userAnswer) {
    let points = 0;
    if (userAnswer === "LIGHT") {
        points = 10;
    } else if (userAnswer === "SPACE") {
        points = 20;
    }
    
    if (points > 0) {
        updatePoints(points);
        return true;
    }
    return false;
}

