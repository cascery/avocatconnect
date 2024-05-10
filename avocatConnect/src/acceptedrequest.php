<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'connectlawyers';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$requestId = $_POST['requestId'] ?? '';
$date = $_POST['date'] ?? '';
$videoLink = $_POST['videoLink'] ?? '';

if (empty($requestId) || empty($date) || empty($videoLink)) {
    die(json_encode(["error" => "Missing parameters"]));
}

// Retrieve client ID and lawyer ID from the service request table
$query = "SELECT clientID, lawyerID FROM servicerequest WHERE serviceRequestID = $requestId";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $clientId = $row['clientID'];
    $lawyerId = $row['lawyerID'];
} else {
    die(json_encode(["error" => "Failed to fetch client ID and lawyer ID"]));
}

// Update the request status to "accepted"
$query = "UPDATE servicerequest SET status = 'accepted' WHERE serviceRequestID = $requestId";
$result = $conn->query($query);

if (!$result) {
    die(json_encode(["error" => "Failed to update request status"]));
}

// Insert a new entry into the reunion table
$query = "INSERT INTO reunion (clinetID, lawyerID, date, videoLink) VALUES ($clientId, $lawyerId, '$date', '$videoLink')";
$result = $conn->query($query);

if ($result) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Failed to insert into reunion table: " . $conn->error]);}

$conn->close();
?>
