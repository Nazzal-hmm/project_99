// Open Settings Button
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

      if (inputValue === "what happened"){
        window.location.href = "../HTML/task2Intro.html";
      }else{
        message.innerHTML = `   "${inputValue}" is incorrect! Try again.`;
        message.style.color = "red";
      }
    }
  })
})