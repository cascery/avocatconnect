<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Retrieve announcement ID from the request body
$announcementID = $_POST['announcementID'] ?? '';

if (empty($announcementID)) {
    die(json_encode(["error" => "Announcement ID not provided"]));
}

$query = "DELETE FROM announce WHERE announceID = '$announcementID'";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error deleting announcement: " . $conn->error]);
}

$conn->close();
?>
