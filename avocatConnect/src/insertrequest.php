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

// Get form data
$clientID = $_POST['clientId'] ?? '';

$lawyerID = $_POST['lawyerID'] ?? '';

$details = $_POST['details'] ?? '';

$selectedDocuments = $_POST['selectedDocuments'] ?? '';

// Check if any required field is empty
if (empty($clientID) || empty($lawyerID) ||    empty($details) || empty($selectedDocuments)) {
    die(json_encode(["error" => "Please provide all required fields"]));
}

// Insert data into serviceRequest table
$query = "INSERT INTO serviceRequest (clientID, lawyerID,serviceID, status, Request_Date, content) 
          VALUES ('$clientID', '$lawyerID','2', 'pending', NOW(), '$details')";

if ($conn->query($query) === TRUE) {
    $requestID = $conn->insert_id; // Get the inserted request ID
    
    // Insert selected documents into lawyer_docs table
    $documents = explode(',', $selectedDocuments);
    foreach ($documents as $documentID) {
        $query = "INSERT INTO lawyer_docs (requestID, docID,date) VALUES
         ('$requestID', '$documentID',NOW())";
        $conn->query($query);
    }
    
    echo json_encode(["success" => true, "message" => "Request sent successfully"]);
} else {
    echo json_encode(["error" => "Failed to send request: " . $conn->error]);
}

$conn->close();
?>
