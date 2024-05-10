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

$userID = $_POST['userId'] ?? '';
if (empty($userID)) {
    die(json_encode(["error" => "User ID not provided"]));
}

$query = "SELECT id FROM lawyer WHERE userID = '$userID'";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $lawyerID = $row['id'];

    // Retrieve reunions associated with the lawyer
    $query = "SELECT reunionID, clinetID, lawyerID, date, videoLink, subject FROM reunion WHERE lawyerID = '$lawyerID'";
    $result = $conn->query($query);

    if ($result && $result->num_rows > 0) {
        $reunions = [];
        while ($row = $result->fetch_assoc()) {
            $reunions[] = [
                "reunionID" => $row['reunionID'],
                "clientID" => $row['clinetID'],
                "lawyerID" => $row['lawyerID'],
                "date" => $row['date'],
                "videoLink" => $row['videoLink'],
                "subject" => $row['subject']
            ];
        }
        
        echo json_encode(["success" => true, "reunions" => $reunions]);
    } else {
        echo json_encode(["error" => "No reunions found"]);
    }
} else {
    echo json_encode(["error" => "Lawyer ID not found for the provided User ID"]);
}

$conn->close();
?>
