function openSettings() {
  const container = document.getElementById("settingsContainer");
  container.style.display = "block"
  }
  function closeIframe(){
  document.getElementById("settingsContainer").style.display = "none";
  }

  document.addEventListener("DOMContentLoaded",() =>{
    const userInput = document.querySelector(".terminal");
  const message = document.getElementById("message");

  userInput.addEventListener("keydown",(e)=> {
    if (e.key === "Enter"){
      let inputValue = userInput.value.trim().toLowerCase();

      if (inputValue === "19,13,55"){
        window.location.href = "../HTML/task2Memory.html";
      }else{
        message.innerHTML = `   "${inputValue}" is incorrect! Try again.`;
        message.style.color = "red";
      }
    }
  })
  })