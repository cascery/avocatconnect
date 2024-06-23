<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$questionId = $_GET['id'] ?? '';


if (empty($questionId)) {
    die(json_encode(["success" => false, "error" => "Question ID is required"]));
}
$query = "SELECT * FROM question WHERE forumID = $questionId";
$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        $question = $result->fetch_assoc();
        echo json_encode(["success" => true, "question" => $question]);
    } else {
        echo json_encode(["success" => false, "error" => "Question not found"]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
