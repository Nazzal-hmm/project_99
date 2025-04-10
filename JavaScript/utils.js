//This should point to YOUR copy of the dbCnnector.php file. 
const dbConnectorUrl = "https://mbanerjee02.webhosting1.eeecs.qub.ac.uk/dbConnector.php";

//Update this with YOUR database credentials.  
const DatabaseConnectionData = {
    url: 'https://mbanerjee02.webhosting1.eeecs.qub.ac.uk/dbConnector.php',
    hostname: "localhost",
    username: "mbanerjee02", // ! Enter own username
    password: "RZ2F39GsN2fSyCnk",// ! Enter own password
    database: "CSC1034_CW_99", // ! Change to group DB when uploading
}
//Useful debug function to print the values of all Session Storage items
function printSessionStorage() {
    console.log("Session Storage Items:");
    for (let i = 0; i < sessionStorage.length; i++) {
        let key = sessionStorage.key(i);
        let value = sessionStorage.getItem(key);
        console.log(`${key}: ${value}`);
    }
}

// Check to see if a user is logged in, if not, direct to login page. 
function checkLogin() {
    if (!sessionStorage.getItem('userId')) {
        window.location.href = 'NewGame.html';
        return;
    }
}

async function updateCurrentSession() {
    const userId = sessionStorage.getItem('userId');
    if (!userId) return;

    // Get current page name from URL
    const currentPage = window.location.pathname;
    const dbConfig = new FormData();
    dbConfig.append('hostname', DatabaseConnectionData.hostname);
    dbConfig.append('username', DatabaseConnectionData.username);
    dbConfig.append('password', DatabaseConnectionData.password);
    dbConfig.append('database', DatabaseConnectionData.database);

    // Get current time from timer if it exists, otherwise use default
    let timeString = '00:00:00';
    if (typeof timeRemaining !== 'undefined') {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        timeString = `00:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }

    const query = `UPDATE Session 
                  SET HTML_pthnm = '${currentPage}',
                      p_time = '${timeString}'
                  WHERE u_id = ${userId}`;

    dbConfig.append('query', query);

    try {
        await fetch(dbConnectorUrl, {
            method: "POST",
            body: dbConfig
        });
    } catch (error) {
        console.error('Error updating session:', error);
    }
}

// Call this function when page loads
window.addEventListener('load', updateCurrentSession);
