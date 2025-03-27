<?php
include 'db_connect.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

$stmt = $conn->prepare("SELECT username, points, time_remaining, current_page FROM players");
$stmt->execute();
$result = $stmt->get_result();

$players = [];
while ($row = $result->fetch_assoc()) {
    $players[] = [
        'username' => $row['username'],
        'points' => $row['points'],
        'time_played' => 600 - $row['time_remaining'], // 600 is initial time
        'current_page' => $row['current_page']
    ];
}

echo json_encode(['data' => $players]);
$conn->close();
?>