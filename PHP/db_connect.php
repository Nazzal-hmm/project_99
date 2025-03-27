<?php
$servername = "webhost1.eeecs.qub.ac.uk";
$username = "mbanerjee02";
$password = "RZ2F39GsN2fSyCnk";
$dbname = "mbanerjee02";

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    echo json_encode([
        "success" => false,
        "message" => "Connection failed: " . $conn->connect_error
    ]);
    exit;
}

// Remove all code below this line and keep only the connection setup