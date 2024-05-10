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

$userId = $_POST['userId'] ?? '';
if (empty($userId)) {
    die("User ID not provided");
}

$query = "SELECT announceID, title, description, publication_date
          FROM announce
          WHERE lawyerID = (
              SELECT lawyerID FROM lawyer WHERE userID = $userId
          )
          ORDER BY publication_date DESC"; // Assuming you want to order by publication date

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $announcements = [];
    while ($row = $result->fetch_assoc()) {
        $announcements[] = [
            "announceID" => $row['announceID'],
            "title" => $row['title'],
            "description" => $row['description'],
            "publication_date" => $row['publication_date']
        ];
    }
    echo json_encode(["success" => true, "announcements" => $announcements]);
} else {
    echo json_encode(["success" => false, "error" => "No announcements found"]);
}

$conn->close();
?>
