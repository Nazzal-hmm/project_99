<?php
include 'db_connect.php';

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    $username = $data['username'];
    $progress = $data['progress'];
    
    $stmt = $conn->prepare("UPDATE players SET 
        time_remaining = ?,
        current_page = ?,
        points = ?
        WHERE username = ?");
        
    $stmt->bind_param("isii", 
        $progress['timeRemaining'],
        $progress['currentPage'],
        $progress['points'],
        $username
    );
    
    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => $conn->error]);
    }
    
    $stmt->close();
} else {
    echo json_encode(['success' => false, 'message' => 'Invalid request method']);
}

$conn->close();
?>