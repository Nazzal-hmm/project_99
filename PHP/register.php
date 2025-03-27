<?php
$servername = "mbanerjee02.webhosting1.eeecs.qub.ac.uk";
$username = "mbanerjee02";  // Change this to your phpMyAdmin username
$password = "RZ2F39GsN2fSyCnk";  // Change this to your phpMyAdmin password
$dbname = "mbanerjee02";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get form data
$user = $_POST['username'];
$pass = password_hash($_POST['password'], PASSWORD_DEFAULT); // Hash password for security

// Check if username already exists
$sql_check = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql_check);
$stmt->bind_param("s", $user);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    echo "<script>alert('Username already exists! Please choose a different one.'); window.location.href='index.html';</script>";
} else {
    // Insert new user
    $sql = "INSERT INTO users (username, password) VALUES (?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $user, $pass);

    if ($stmt->execute()) {
        // Redirect to welcomePage.html after successful registration
        echo "<script>alert('Database connected! Account successfully registered.'); window.location.href='../HTML/welcomePage.html';</script>";
    } else {
        echo "Error: " . $stmt->error;
    }
}

$stmt->close();
$conn->close();
?>