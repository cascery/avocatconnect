<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}
$questionId = $_GET['id'] ?? '';

$query = "SELECT * FROM comments WHERE forumID = $questionId";
$result = $conn->query($query);

if ($result) {
    $comments = [];
    while ($row = $result->fetch_assoc()) {
        $comments[] = $row;
    }
    echo json_encode(["success" => true, "comments" => $comments]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
