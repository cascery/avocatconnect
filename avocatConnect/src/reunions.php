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
    $queryReunions = "SELECT reunionID, clinetID, lawyerID, date, videoLink,time, subject FROM reunion WHERE lawyerID = '$lawyerID'";
    $resultReunions = $conn->query($queryReunions);

    if ($resultReunions && $resultReunions->num_rows > 0) {
        $reunions = [];
        while ($row = $resultReunions->fetch_assoc()) {
            $clientID = $row['clinetID'];
            
            // Fetch client details using clientID
            $queryClient = "SELECT name,lastname, profilePic FROM user WHERE userID = (SELECT userID FROM client WHERE clientID = '$clientID')";
            $resultClient = $conn->query($queryClient);

            if ($resultClient && $resultClient->num_rows > 0) {
                $rowClient = $resultClient->fetch_assoc();
                $clientName = $rowClient['name'];
                $clientLastName = $rowClient['lastname'];
                $clientProfilePic = $rowClient['profilePic'];
            } else {
                $clientName = 'Unknown';
                $clientProfilePic = null;
            }

            $reunions[] = [
                "reunionID" => $row['reunionID'],
                "clientID" => $clientID,
                "lawyerID" => $row['lawyerID'],
                "clientName" => $clientName,
                "clientLastName" => $clientLastName,

                "clientProfilePic" => $clientProfilePic,
                "date" => $row['date'],
                "videoLink" => $row['videoLink'],
                "subject" => $row['subject'],
                "time" => $row['time']
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
