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

$userId = $_POST['lawyerId'] ?? '';
if (empty($userId)) {
    die("User ID not provided");
}

$query = "SELECT u.userID, u.name,u.wilaya, u.lastname, u.email,u.username, u.tel AS phone, u.profilePic, s.speciality
FROM user u
INNER JOIN lawyer l ON u.userID = l.userID
INNER JOIN speciality s ON l.specialite = s.specialityID
WHERE u.userID = $userId"; // Use the provided user ID instead of hardcoded value

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $profileData = [
        "wilaya"=>$row['wilaya'],
        "userId" => $row['userID'],
        "name" => $row['name'],
        "lastname" => $row['lastname'],
        "email" => $row['email'],
        "username" => $row['username'],
        "phone" => $row['phone'],
        "profilePic" => $row['profilePic'], // Encode profile picture as base64
        "speciality" => $row['speciality'] // Include the speciality
    ];
    // Encode profile data as JSON
    echo json_encode(["success" => true, "data" => $profileData]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to fetch profile data"]);
}

$conn->close();
?>
