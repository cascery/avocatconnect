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
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

// Get the client ID from the request
$clientID = $_POST['clientId'] ?? '';
if (empty($clientID)) {
    die(json_encode(["success" => false, "error" => "Client ID not provided"]));
}

// Retrieve the user ID based on the client ID
$getUserIDQuery = "SELECT userID FROM client WHERE clientID = $clientID";
$userIDResult = $conn->query($getUserIDQuery);

if ($userIDResult->num_rows > 0) {
    $row = $userIDResult->fetch_assoc();
    $userID = $row["userID"];

    // Initialize an array to store the update SQL statements
    $updateStatements = [];

    // Check if each field exists in the request and add it to the update statements if it's not empty
    if (isset($_POST['name'])) {
        $name = $conn->real_escape_string($_POST['name']);
        if (!empty($name)) {
            $updateStatements[] = "name = '$name'";
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
    if (isset($_POST['profilePic'])) {
        $profilePic = $conn->real_escape_string($_POST['profilePic']);
        if (!empty($profilePic)) {
    
            $updateStatements[] = "profilePic = '$profilePic'";
        }
    }

    // Construct the update query
    $updateQuery = "UPDATE `user` SET " . implode(", ", $updateStatements) . " WHERE `userID` = $userID";
    // Check if the query was constructed correctly
    if ($updateQuery === FALSE) {
        echo json_encode(["success" => false, "error" => "Error constructing update query"]);
    } else {
        // Execute the update query
        if ($conn->query($updateQuery) === TRUE) {
            echo json_encode(["success" => true, "message" => "Profile updated successfully"]);
        } else {
            echo json_encode(["success" => false, "error" => "Error updating profile: " . $conn->error]);
        }
    }
    
} else {
    die(json_encode(["success" => false, "error" => "User ID not found for the provided Client ID"]));
}

$conn->close();
?>
