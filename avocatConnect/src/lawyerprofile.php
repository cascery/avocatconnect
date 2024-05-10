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

$lawyerId = $_POST['id'] ?? '';

if (empty($lawyerId)) {
    die("Lawyer ID not provided");
}

$query = "SELECT u.userID, u.name,u.wilaya, u.lastname, u.email,u.username, u.tel AS phone, u.profilePic, s.speciality
FROM user u
INNER JOIN lawyer l ON u.userID = l.userID
INNER JOIN speciality s ON l.specialite = s.specialityID
WHERE l.id = $lawyerId"; // Use the provided lawyer ID instead of hardcoded value

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
