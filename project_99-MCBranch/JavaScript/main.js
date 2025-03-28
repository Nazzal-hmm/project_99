// Initialize game
document.addEventListener('DOMContentLoaded', () => {
    fetch('../PHP/fetch_tasks.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                console.log(data.data); // Array of tasks
            } else {
                console.error(data.error);
            }
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
        });
});