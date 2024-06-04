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

// Retrieve document ID from the request body
$documentID = $_POST['documentID'] ?? '';

if (empty($documentID)) {
    die(json_encode(["error" => "Document ID not provided"]));
}

$query = "DELETE FROM documents WHERE documentID = '$documentID'";

if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["error" => "Error deleting document: " . $conn->error]);
}

$conn->close();
?>
