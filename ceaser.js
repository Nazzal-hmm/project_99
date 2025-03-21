const inputText = document.getElementById("inputText");
const shiftSlider = document.getElementById("shiftSlider");
const shiftValue = document.getElementById("shiftValue");
const outputText = document.getElementById("outputText");
const inputTextAnswer = document.getElementById("inputTextAnswer");

shiftSlider.addEventListener("input", function () {
    let shift = parseInt(shiftSlider.value);
    shiftValue.textContent = shift;
    unscrambleText();
});

inputText.addEventListener("input", unscrambleText);

inputTextAnswer.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const userAnswer = inputTextAnswer.value.trim().toUpperCase();
        if (userAnswer) {
            showConfirmation(userAnswer);
            inputTextAnswer.value = "";
        }
    }
});

function showConfirmation(userAnswer) {
    const confirmationMessage = document.createElement("p");
    confirmationMessage.textContent = "Input Accepted: " + userAnswer;
    confirmationMessage.classList.add("confirmation-message");

    const nextPageButton = document.createElement("button");
    nextPageButton.textContent = "Proceed to Next Page";
    nextPageButton.classList.add("next-page-button");

    nextPageButton.addEventListener("click", function () {
        window.location.href = "next-page.html";
    });

    const enterAnswerDiv = document.querySelector(".enterAnswer");
    enterAnswerDiv.appendChild(confirmationMessage);
    enterAnswerDiv.appendChild(nextPageButton);
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
        }
    } else {
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
    }

    outputText.textContent = result || "Unscrambled text will appear here";
}

unscrambleText();