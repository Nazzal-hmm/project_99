async function saveGame() {
    clearInterval(timer)
    let sqlQuery = "UPDATE mcqSessions SET isCompleted = FALSE, lastQuestionIndex = " + currentQuestionIndex + ", quTimeRemaining = " + timeRemaining + " WHERE sessionId = " + sessionId

    console.log(sqlQuery)

    dbConfig.set('query', sqlQuery)
    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let result = await response.json()

        if (result.success == true) {
            console.log("Game saved successfully!")
            window.location.href = "welcome.html"
        } else {
            console.error("Error saving game.", result)
        }

    } catch {
        console.error("Error saving game:", error)
    }
}

async function loadGameSession() {
    let sqlQuery = "SELECT sessionId, lastQuestionIndex, quTimeRemaining FROM mcqSessions WHERE userId = " + userId + " AND isCompleted = FALSE ORDER BY startedAt DESC LIMIT 1"

    dbConfig.set('query', sqlQuery)
    try {
        let r = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let result = await r.json()

        if (result.success && result.data.length > 0) {
            let data = result.data[0]
            sessionId = data.sessionId
            currentQuestionIndex = data.lastQuestionIndex

            sessionStorage.setItem('timeRemaining', data.quTimeRemaining)
            sessionStorage.setItem('sessionId', sessionId)
            sessionStorage.setItem('currentQuestionIndex', currentQuestionIndex)

            console.log("Loaded existing session:", data)
            await loadQuestions()
        } else {
            console.error("No saved session found.")
            await makeNewSession()
            await getQuestions()
        }
    } catch (error) {
        console.error("Error loading session:", error)
    }
}

async function loadQuestions() {
    let q = "SELECT q.id, q.question, q.optionA, q.optionB, q.optionC, q.optionD, q.correctAnswer, sq.qNo FROM mcqSessionQuestions sq JOIN mcqQuestions q ON sq.questionId = q.id WHERE sq.sessionId = " + sessionId + " ORDER BY sq.qNo"

    dbConfig.set('query', q)

    try {
        let r = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let result = await r.json()

        if (result.success && result.data.length > 0) {
            selectedMcqs = result.data
            console.log("Loaded saved questions:", selectedMcqs)
        } else {
            console.error("Error retrieving saved questions.", result)
        }
    } catch (error) {
        console.error("Error loading saved questions:", error)
    }
}
