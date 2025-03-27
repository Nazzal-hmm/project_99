<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$servername = "mbanerjee02.webhosting1.eeecs.qub.ac.uk";
$username = "mbanerjee02";  // Change this to your phpMyAdmin username
$password = "RZ2F39GsN2fSyCnk";  // Change this to your phpMyAdmin password
$dbname = "mbanerjee02";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get all users
$sql = "SELECT username, created_at FROM users ORDER BY created_at DESC";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registered Players</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h2>Registered Players</h2>
    <table border="1">
        <tr>
            <th>Username</th>
            <th>Registered On</th>
        </tr>
        <?php while ($row = $result->fetch_assoc()) { ?>
        <tr>
            <td><?php echo htmlspecialchars($row['username']); ?></td>
            <td><?php echo $row['created_at']; ?></td>
        </tr>
        <?php } ?>
    </table>
</body>
</html>

<?php
$conn->close();
?>