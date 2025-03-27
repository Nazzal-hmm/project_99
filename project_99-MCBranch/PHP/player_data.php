<?php
include 'db_connect.php';

// Get player data
function getPlayerData() {
    global $conn;
    $sql = "SELECT username, points, completion_time FROM players ORDER BY points DESC";
    $result = $conn->query($sql);
    
    $data = array();
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $data[] = $row;
        }
    }
    return json_encode($data);
}

// Update player points
function updatePlayerPoints($username, $points) {
    global $conn;
    $sql = "UPDATE players SET points = ? WHERE username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $points, $username);
    return $stmt->execute();
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    echo getPlayerData();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    echo updatePlayerPoints($data['username'], $data['points']);
}
?>