<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$clientId = $_POST['clientId'] ?? '';

if (empty($clientId)) {
    die(json_encode(["success" => false, "error" => "Client ID is missing"]));
}

$query = "SELECT c.*, u.name, u.lastname,u.profilePic FROM client c
          INNER JOIN user u ON c.userID = u.userID
          WHERE c.clientID = '$clientId'";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $clientInfo = $result->fetch_assoc();
    echo json_encode(["success" => true, "clientInfo" => $clientInfo]);
} else {
    echo json_encode(["success" => false, "error" => "Client not found"]);
}

$conn->close();
?>
