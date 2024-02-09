<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'connectlawyers';

// Create connection
$conn = new mysqli($host, $username, $password, $database);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Fetch questions from the database
$query = "SELECT askingplace.*, client.username AS client_username 
          FROM askingplace 
          JOIN client ON askingplace.clientID = client.clientID";
$result = $conn->query($query);

if ($result->num_rows > 0) {
    // Store questions in an array
    $questions = array();
    while ($row = $result->fetch_assoc()) {
        $questions[] = $row;
    }
    // Output questions as JSON
    echo json_encode(array("questions" => $questions));
} else {
    // No questions found
    echo json_encode(array("message" => "No questions found"));
}

// Close connection
$conn->close();
?>
