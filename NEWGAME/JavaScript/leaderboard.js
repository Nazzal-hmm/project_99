async function openLeaderboard() {
    document.getElementById('leaderboardContainer').style.display = 'block'
    
    let dbConfig = new FormData()
    dbConfig.append('hostname', DatabaseConnectionData.hostname)
    dbConfig.append('username', DatabaseConnectionData.username)
    dbConfig.append('password', DatabaseConnectionData.password)
    dbConfig.append('database', DatabaseConnectionData.database)

    let query = "SELECT u.username, COALESCE(p.points, 0) as points, COALESCE(s.p_time, '00:00:00') as play_time FROM Users u LEFT JOIN points p ON u.u_id = p.u_id LEFT JOIN Session s ON u.u_id = s.u_id ORDER BY points DESC, play_time ASC LIMIT 10"
    
    dbConfig.append('query', query)

    try {
        let response = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })

        let result = await response.json()
        console.log('Query sent:', query)
        console.log('Database response:', result)

        let leaderboardDiv = document.getElementById('leaderboardContent')
        
        if (!result.data || result.data.length === 0) {
            leaderboardDiv.innerHTML = '<p>No users available yet.</p>'
            return
        }

        let tableHtml = '<table><tr><th>Rank</th><th>Username</th><th>Points</th><th>Time</th></tr>'
        
        for(let i = 0; i < result.data.length; i++) {
            let player = result.data[i]
            let rank = i + 1
            tableHtml = tableHtml + '<tr>'
            tableHtml = tableHtml + '<td>' + rank + '</td>'
            tableHtml = tableHtml + '<td>' + player.username + '</td>'
            tableHtml = tableHtml + '<td>' + player.points + '</td>'
            tableHtml = tableHtml + '<td>' + player.play_time + '</td>'
            tableHtml = tableHtml + '</tr>'
        }
        
        tableHtml = tableHtml + '</table>'
        leaderboardDiv.innerHTML = tableHtml

    } catch (error) {
        console.error('Error fetching leaderboard:', error)
        let errorDiv = document.getElementById('leaderboardContent')
        errorDiv.innerHTML = '<p style="color: red;">Error loading leaderboard. Please try again later.</p>'
    }
}

function closeLeaderboard() {
    let leaderboard = document.getElementById('leaderboardContainer')
    leaderboard.style.display = 'none'
}
