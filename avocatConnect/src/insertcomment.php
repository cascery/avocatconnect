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
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$userID = $_POST['lawyerId'] ?? '';
$forumID = $_POST['forumID'] ?? '';
$content = $_POST['content'] ?? '';

// Find the corresponding lawyerID using userID
$query = "SELECT id FROM lawyer WHERE userID = '$userID'";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $lawyerID = $row['id'];

    // Insert comment into the database
    $insertQuery = "INSERT INTO comments (lawyerID, forumID, content, date)
                    VALUES ('$lawyerID', '$forumID', '$content', NOW())";

    if ($conn->query($insertQuery) === TRUE) {
        echo json_encode(["success" => true, "message" => "Comment posted successfully"]);
    } else {
        echo json_encode(["success" => false, "error" => "Failed to post comment: " . $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => "Failed to find corresponding lawyer ID"]);
}

$conn->close();
?>
