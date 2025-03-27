document.addEventListener("DOMContentLoaded", () => {
  const userInput = document.getElementById("userIn");
  const displayBlock = document.getElementById("displayBlock");
  userInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      const inputValue = userInput.value.toLowerCase().trim();
      // Check for empty input
      if (!inputValue) {
        displayBlock.innerHTML = "Please enter a command!";
        userInput.value = "";
        return;
      }

      if (window.location.pathname === "/HTML/Corridor1.html") {
        if (inputValue === "go window") {
          location.href = "../HTML/Corridor2.html";
        } else if (inputValue === "go door") {
          location.href = "../HTML/Starting2.html";
        } else {
          displayBlock.innerHTML = `${inputValue} is an Invalid input!<br>Type 'go window' to check the window or 'go door' to go to the next room!`;
          userInput.value = "";
        }
      }

      if (window.location.pathname === "/HTML/Corridor2.html") {
        if (inputValue === "go corridor") {
          location.href = "../HTML/Corridor1.html";
        } else {
          displayBlock.innerHTML = `${inputValue} is an Invalid input!<br>Type 'go corridor' to go back to the corridor!`;
          userInput.value = "";
        }
      }
    }
  });
});
