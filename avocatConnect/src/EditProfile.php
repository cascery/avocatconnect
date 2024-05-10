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

// Get the user ID from the request
$userId = $_POST['userId'] ?? '';
if (empty($userId)) {
    die(json_encode(["success" => false, "error" => "User ID not provided"]));
}

// Initialize an array to store the update SQL statements
$updateStatements = [];

// Check if each field exists in the request and add it to the update statements if it's not empty
if (isset($_POST['name'])) {
    $name = $conn->real_escape_string($_POST['name']);
    if (!empty($name)) {
        $updateStatements[] = "name = '$name'";
    }
}
if (isset($_POST['profilePic'])) {
    $profilePic = $conn->real_escape_string($_POST['profilePic']);
    if (!empty($profilePic)) {

        $updateStatements[] = "profilePic = '$profilePic'";
    }
}

if (isset($_POST['lastName'])) {
    $lastName = $conn->real_escape_string($_POST['lastName']);
    if (!empty($lastName)) {
        $updateStatements[] = "lastname = '$lastName'";
    }
}

if (isset($_POST['username'])) {
    $username = $conn->real_escape_string($_POST['username']);
    if (!empty($username)) {
        $updateStatements[] = "username = '$username'";
    }
}



if (isset($_POST['wilaya'])) {
    $wilaya = $conn->real_escape_string($_POST['wilaya']);
    if (!empty($wilaya)) {
        $updateStatements[] = "wilaya = '$wilaya'";
    }
}

// Construct the update query
$updateQuery = "UPDATE user SET " . implode(", ", $updateStatements) . " WHERE userID = $userId";

// Execute the update querys
if ($conn->query($updateQuery) === TRUE) {
    echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
} else {
    echo json_encode(["success" => false, "error" => "Error updating profile: " . $conn->error]);
}

$conn->close();
?>
