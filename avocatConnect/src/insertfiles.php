<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");
$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the database connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Check if the form was submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Retrieve client ID, file name, and file data from the form
    $clientId = $_POST['clientId'] ?? '';
    $filename = $_POST['filename'] ?? '';
    $fileData = file_get_contents($_FILES['file']['tmp_name']);

    // Validate input
    if (empty($clientId) || empty($filename) || empty($fileData)) {
        die(json_encode(["error" => "Client ID, filename, or file data not provided"]));
    }

    // Prepare and execute the SQL statement to insert the document into the database
    $stmt = $conn->prepare("INSERT INTO documents (clientID, file_name, file, date) VALUES (?, ?, ?, NOW())");
$stmt->bind_param("isb", $clientId, $filename, $fileData);

    if ($stmt->execute()) {
        echo json_encode(["success" => true, "message" => "Document inserted successfully"]);
    } else {
        echo json_encode(["error" => "Error inserting document: " . $conn->error]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

$conn->close();
?>
