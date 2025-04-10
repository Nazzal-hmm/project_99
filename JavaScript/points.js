async function updatePoints(pointsToAdd) {
    let userId = sessionStorage.getItem('userId')
    if (!userId) return

    let dbConfig = new FormData()
    dbConfig.append('hostname', DatabaseConnectionData.hostname)
    dbConfig.append('username', DatabaseConnectionData.username)
    dbConfig.append('password', DatabaseConnectionData.password)
    dbConfig.append('database', DatabaseConnectionData.database)
    
    let getPointsQuery = "SELECT points FROM points WHERE u_id = " + userId
    dbConfig.set('query', getPointsQuery)
    
    try {
        let r = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let result = await r.json()
        
        let currentPoints = parseInt(result.data[0]?.points || 0)
        let newPoints = currentPoints + parseInt(pointsToAdd)
        
        let updateQuery = "UPDATE points SET points = " + newPoints + " WHERE u_id = " + userId
        dbConfig.set('query', updateQuery)
        
        let r2 = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        
        let pointsDisplay = document.getElementById('points-display')
        if (pointsDisplay) {
            pointsDisplay.textContent = "Points: " + newPoints
        }
    } catch (error) {
        console.error('Error updating points:', error)
    }
}

async function initializePointsIfNeeded() {
    let userId = sessionStorage.getItem('userId')
    if (!userId) return

    let dbConfig = new FormData()
    dbConfig.append('hostname', DatabaseConnectionData.hostname)
    dbConfig.append('username', DatabaseConnectionData.username)
    dbConfig.append('password', DatabaseConnectionData.password)
    dbConfig.append('database', DatabaseConnectionData.database)
    
    let checkQuery = "SELECT points FROM points WHERE u_id = " + userId
    dbConfig.set('query', checkQuery)
    
    try {
        let r = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let result = await r.json()
        
        if (!result.data || result.data.length == 0) {
            let initQuery = "INSERT INTO points (u_id, p_id, points) VALUES (" + userId + ", " + userId + ", 0)"
            dbConfig.set('query', initQuery)
            
            let r2 = await fetch(dbConnectorUrl, {
                method: "POST",
                body: dbConfig
            })
        }
    } catch (error) {
        console.error('Error checking/initializing points:', error)
    }
}

window.addEventListener('load', initializePointsIfNeeded)

