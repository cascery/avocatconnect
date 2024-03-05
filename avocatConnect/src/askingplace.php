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
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and escape user input
$title = $conn->real_escape_string($_POST['title'] ?? '');
$content = $conn->real_escape_string(strip_tags($_POST['content']));
$clientId = $conn->real_escape_string($_POST['clientId'] ?? '');

$query = "INSERT INTO question (clientID, title, content)
          VALUES ('$clientId', '$title', '$content')";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
