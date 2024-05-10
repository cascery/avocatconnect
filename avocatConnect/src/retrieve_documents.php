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

$requestId = $_POST['requestId'] ?? '';

if (empty($requestId)) {
    die(json_encode(["error" => "Request ID not provided"]));
}

// Retrieve documents associated with the service request
$queryDocs = "SELECT d.file
              FROM documents d
              INNER JOIN lawyer_docs ld ON d.documentID = ld.docID
              WHERE ld.docID IN (
                  SELECT docID FROM servicerequest WHERE serviceRequestID = $requestId)";

$resultDocs = $conn->query($queryDocs);

if ($resultDocs && $resultDocs->num_rows > 0) {
    $documents = []; // Initialize an empty array

    while ($row = $resultDocs->fetch_assoc()) {
        // Push each fetched document into the array
        $documents[] = ["file" => base64_encode($row['file'])];
    }

    echo json_encode(["success" => true, "documents" => $documents]);
} else {
    echo json_encode(["success" => false, "error" => "No documents found"]);
}

$conn->close();
?>
