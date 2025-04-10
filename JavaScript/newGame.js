sessionStorage.clear()

printSessionStorage()

function toggleForms() {
    document.getElementById("loginContainer").classList.toggle("hidden")
    document.getElementById("registerContainer").classList.toggle("hidden")
}

document.getElementById("loginForm").addEventListener("submit", async function (event) {
    event.preventDefault()

    let username = document.getElementById("username").value

    let sqlQuery = "SELECT u_id, username FROM Users WHERE username = '" + username + "'"
    dbConfig.set('query', sqlQuery)

    try {
        let r = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let result = await r.json()

        if (result.success == true && result.data.length > 0) {
            let user = result.data[0]
            sessionStorage.setItem("userId", user.u_id)
            sessionStorage.setItem("username", user.username)
            window.location.href = "../HTML/Starting1.html"
        } else {
            document.getElementById("loginMessage").textContent = "Invalid username."
        }
    } catch (error) {
        console.error("Error completing login:", error)
    }
})

document.getElementById("registerForm").addEventListener("submit", async function (event) {
    event.preventDefault()

    let username = document.getElementById("regUsername").value

    let checkQuery = "SELECT u_id FROM Users WHERE username = '" + username + "'"
    dbConfig.set('query', checkQuery)
    
    try {
        let r = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let checkResult = await r.json()

        if (checkResult.success == true && checkResult.data.length > 0) {
            document.getElementById("registerMessage").textContent = "Username already exists."
            return
        }

        let newUserQuery = "INSERT INTO Users (username) VALUES ('" + username + "')"
        dbConfig.set('query', newUserQuery)

        let r2 = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let insertResult = await r2.json()

        if (insertResult.success == true) {
            let idQuery = "SELECT u_id FROM Users WHERE username = '" + username + "'"
            dbConfig.set('query', idQuery)
            let r3 = await fetch(dbConnectorUrl, {
                method: "POST",
                body: dbConfig
            })
            let userData = await r3.json()
            
            if (userData.success == true && userData.data.length > 0) {
                let userId = userData.data[0].u_id
                
                let pointsQuery = "INSERT INTO points (u_id, p_id, points) VALUES (" + userId + ", " + userId + ", 0)"
                dbConfig.set('query', pointsQuery)
                
                let r4 = await fetch(dbConnectorUrl, {
                    method: "POST",
                    body: dbConfig
                })
                
                if (r4.ok == true) {
                    document.getElementById("registerMessage").textContent = "Registration successful!"
                    document.getElementById("registerForm").reset()
                    toggleForms()
                } else {
                    document.getElementById("registerMessage").textContent = "Error initializing points."
                }
            }
        } else {
            document.getElementById("registerMessage").textContent = "Error registering user."
        }
    } catch (error) {
        console.error("Error during registration:", error)
        document.getElementById("registerMessage").textContent = "Registration failed."
    }
});
