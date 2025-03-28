<?php
// Database connection parameters
$servername = "webhost1.eeecs.qub.ac.uk";
$username = "mbanerjee02";
$password = "RZ2F39GsN2fSyCnk";
$dbname = "mbanerjee02";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Set character set to utf8mb4
$conn->set_charset("utf8mb4");

// Optional: Uncomment the line below for debugging during development
// echo "Connected successfully";
?>