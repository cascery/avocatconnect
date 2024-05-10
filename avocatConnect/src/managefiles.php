<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST");

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'connectlawyers';

// Create a database connection
$conn = new mysqli($host, $username, $password, $database);

// Check the database connection
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$clientId = $_POST['clientId'] ?? '';

if (empty($clientId)) {
    die(json_encode(["error" => "Client ID not provided"]));
}

// Retrieve documents associated with the client
$queryDocs = "SELECT * FROM documents WHERE clientID = $clientId";

$resultDocs = $conn->query($queryDocs);

if ($resultDocs && $resultDocs->num_rows > 0) {
    $documents = []; // Initialize an empty array

    while ($row = $resultDocs->fetch_assoc()) {
        // Push each fetched document into the array
        $documents[] = ["file" => base64_encode($row['file']),
        "date" => $row['date'],
    "file_name"=>$row['file_name']];
    }

    echo json_encode(["success" => true, "documents" => $documents]);
} else {
    echo json_encode(["success" => false, "error" => "No documents found"]);
}

$conn->close();
?>
