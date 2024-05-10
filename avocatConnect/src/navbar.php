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
$userId = $_POST['lawyerId'] ?? '';

if (empty($userId)) {
    die(json_encode(["error" => "User ID not provided"]));
}

$query = "SELECT profilePic FROM user WHERE userID = $userId";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $profilePic =$row['profilePic'];
    echo json_encode(["profilePic" => $profilePic]);
} else {
    echo json_encode(["error" => "Profile picture not found"]);
}

$conn->close();
?>
