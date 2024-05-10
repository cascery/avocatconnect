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
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$forumID = $_POST['forumID'] ?? '';

if (empty($forumID)) {
    die(json_encode(["success" => false, "error" => "Forum ID cannot be empty"]));
}

// Fetch comments and corresponding lawyer usernames
$query = "SELECT comments.commentID, comments.content, comments.forumID, comments.lawyerID
          FROM comments
          LEFT JOIN lawyer ON comments.lawyerID = lawyer.id
          WHERE comments.forumID = '{$forumID}'";

$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        $comments = [];
        while ($row = $result->fetch_assoc()) {
            $comments[] = $row;
        }
        $data = [
            "success" => true,
            "comments" => $comments
        ];
        echo json_encode($data);
    } else {
        echo json_encode(["success" => false, "error" => "No comments found for the forum"]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
