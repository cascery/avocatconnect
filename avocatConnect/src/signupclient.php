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

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$name = $_POST['name'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$username = $_POST['username'] ?? '';
$phone = $_POST['phone'] ?? '';
$adress = $_POST['adress'] ?? '';
$birth = $_POST['birth'] ?? '';
$userType = 'client'; // Set userType to 'client'

// Insert user data into the user table
$queryUser = "INSERT INTO user (name, lastname, birthday, email, tel, username, password, userType, creationDate)
          VALUES ('$name', '$lastname', '$birth', '$email', '$phone', '$username', '$password', '$userType', NOW())";

if ($conn->query($queryUser) === TRUE) {
    $userID = $conn->insert_id; // Get the auto-generated user ID

    // Insert client-specific data into the client table
    $queryClient = "INSERT INTO client (userID)
              VALUES ('$userID')";

    if ($conn->query($queryClient) === TRUE) {
        echo json_encode(["success" => true, "userID" => $userID]);
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
