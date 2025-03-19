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
function openSettings() {
const container = document.getElementById("settingsContainer");
container.style.display = "block"
}
function closeIframe(){
document.getElementById("settingsContainer").style.display = "none";
}

//Scenes
document.addEventListener("DOMContentLoaded", () => {
    let userInput = document.getElementById("userIn");
    let displayBlock =document.getElementById("displayBlock")
    
    userInput.addEventListener("keydown", (e) => {

        //Scene1
        if (window.location.pathname === "/sites/scene1.html" && e.key === "Enter") {
            let inputValue = userInput.value.trim();

            if (inputValue === "go ship") {
                location.href = "/sites/task4final.html";
            } else {
               displayBlock.innerHTML= inputValue+" is an Invalid input!<br>Type 'go ship' to change location!";
               userInput.value="";
            }
        }

        //Task4final
        if (window.location.pathname === "/sites/task4final.html" && e.key === "Enter") {
            let inputValue = userInput.value.trim();
     
            if(inputValue === "go back"){
                location.href = "/sites/scene1.html";
             } else{
                 displayBlock.innerHTML= inputValue+" is an Invalid input!<br>Type 'go back' to change location!";
                 userInput.value="";
             }
       }
        
    });
});


