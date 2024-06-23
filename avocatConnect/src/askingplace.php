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
    die("Connection failed: " . $conn->connect_error);
}

// Sanitize and escape user input
$title = $conn->real_escape_string($_POST['title'] ?? '');
$content = $conn->real_escape_string(($_POST['content']));
$userId = $conn->real_escape_string($_POST['userID'] ?? '');

// Get clientId using userId
$query = "SELECT clientID FROM client WHERE userID = '$userId'";
$result = $conn->query($query);


    // Insert question with clientId
    $insertQuery = "INSERT INTO question (userID, title, content) VALUES ('$userId', '$title', '$content')";
    if ($conn->query($insertQuery) === TRUE) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }


$conn->close();
?>
