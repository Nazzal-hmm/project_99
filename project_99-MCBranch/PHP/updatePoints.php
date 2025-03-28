<?php
header('Content-Type: application/json');

$host = 'webhost1.eeecs.qub.ac.uk';
$dbname = 'mbanerjee02';
$username = 'mbanerjee02';
$password = 'RZ2F39GsN2fSyCnk';

try {
    $conn = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $data = json_decode(file_get_contents('php://input'), true);
    $username = $data['username'];
    $points = $data['points'];

    $stmt = $conn->prepare("UPDATE users SET points = points + ? WHERE username = ?");
    $stmt->execute([$points, $username]);

    echo json_encode(['success' => true, 'points' => $points]);
} catch(PDOException $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
?>