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

