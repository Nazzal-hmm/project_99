<?php
session_start();
require_once 'db_connect.php';
header('Content-Type: application/json');

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim($_POST["username"]);
    $password = trim($_POST["password"]);
    $response = array();

    // Validate input
    if (empty($username) || empty($password)) {
        $response = array('success' => false, 'error' => 'Please enter both username and password.');
    } else {
        // Prepare SQL statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT id, username, password FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 1) {
            $user = $result->fetch_assoc();
            
            // Verify password
            if (password_verify($password, $user['password'])) {
                // Password is correct
                $_SESSION['user_id'] = $user['id'];
                $_SESSION['username'] = $user['username'];
                $response = array('success' => true);
            } else {
                // Password is incorrect
                $response = array('success' => false, 'error' => 'Invalid username or password.');
            }
        } else {
            // Username not found
            $response = array('success' => false, 'error' => 'Invalid username or password.');
        }
        
        $stmt->close();
    }
    
    echo json_encode($response);
}

$conn->close();
?>