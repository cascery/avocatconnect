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

$userID = $_POST['lawyerId'] ?? '';

if (empty($userID)) {
    die(json_encode(["error" => "User ID not provided"]));
}

$title = $_POST['title'] ?? '';
$description = $_POST['description'] ?? '';

if (empty($title) || empty($description)) {
    die(json_encode(["error" => "Title or description not provided"]));
}

// Insert announcement into the database
$query = "INSERT INTO announce (lawyerID, title, description, publication_date)
          SELECT id, '$title', '$description', NOW() FROM lawyer WHERE userID = '$userID'";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true, "message" => "Announcement posted successfully"]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to post announcement: " . $conn->error]);
}

$conn->close();
?>
