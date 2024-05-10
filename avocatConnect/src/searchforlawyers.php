<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

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

$searchQuery = $_POST['searchQuery'] ?? '';
if (empty($searchQuery)) {
    die(json_encode(["error" => "Search query not provided"]));
}

// Assuming user and lawyer tables have the following structure:
// user: userID, nom, prenom, profilePhoto
// lawyer: id, userID

$query = "SELECT user.name, user.lastname, user.profilePic, lawyer.id ,user.bio
FROM user 
INNER JOIN lawyer ON user.userID = lawyer.userID 
WHERE user.name LIKE '%$searchQuery%'  or  user.lastname LIKE '%$searchQuery%'";

$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $lawyers = [];
    while ($row = $result->fetch_assoc()) {
        $lawyers[] = [
            "id" => $row['id'],
            "name" => $row['name'],
            "lastname" => $row['lastname'],
            "profilePic" => $row['profilePic']
        ];
    }
    
    echo json_encode(["success" => true, "lawyers" => $lawyers]);
} else {
    echo json_encode(["error" => "No lawyers found"]);
}

$conn->close();
?>
