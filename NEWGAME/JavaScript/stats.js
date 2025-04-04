document.addEventListener('DOMContentLoaded', async () => {
    let userId = sessionStorage.getItem('userId')
    if (!userId) {
        window.location.href = '../HTML/welcomePage.html'
        return
    }

    let dbConfig = new FormData()
    dbConfig.append('hostname', DatabaseConnectionData.hostname)
    dbConfig.append('username', DatabaseConnectionData.username)
    dbConfig.append('password', DatabaseConnectionData.password)
    dbConfig.append('database', DatabaseConnectionData.database)

    try {
        // get username from db
        let q1 = "SELECT username FROM Users WHERE u_id = " + userId
        dbConfig.set('query', q1)
        let r1 = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let data1 = await r1.json()
        
        if (data1.success == true && data1.data.length > 0) {
            document.getElementById('username').textContent = data1.data[0].username
        }

        // get points from db
        let q2 = "SELECT points FROM points WHERE u_id = " + userId
        dbConfig.set('query', q2)
        let r2 = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let data2 = await r2.json()
        
        if (data2.success == true && data2.data.length > 0) {
            document.getElementById('points').textContent = data2.data[0].points
        }

        // get time from db
        let q3 = "SELECT p_time FROM Session WHERE u_id = " + userId
        dbConfig.set('query', q3)
        let r3 = await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        })
        let data3 = await r3.json()
        
        if (data3.success == true && data3.data.length > 0) {
            document.getElementById('time').textContent = data3.data[0].p_time
        }

    } catch (error) {
        console.error('Error fetching stats:', error)
        document.getElementById('username').textContent = 'Error loading data'
        document.getElementById('points').textContent = 'Error'
        document.getElementById('time').textContent = 'Error'
    }
})

