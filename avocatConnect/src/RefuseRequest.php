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
$lawyerId = $_POST['lawyerId'] ?? '';
if (empty($requestId) || empty($lawyerId)) {
    die(json_encode(["error" => "Request ID or Lawyer ID not provided"]));
}

// Update the status of the request to 'Refused' in the database
$query = "UPDATE servicerequest SET status = 'Refused' WHERE serviceRequestID = $requestId";
if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to update status"]);
}

$conn->close();
?>
