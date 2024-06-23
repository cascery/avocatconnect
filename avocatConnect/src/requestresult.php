<?php
// Enable error reporting
error_reporting(E_ALL);
ini_set('display_errors', 1);

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

$clientID = $_POST['clientID'] ?? '';
if (empty($clientID)) {
    die(json_encode(["error" => "Client ID not provided"]));
}

// First Query: Retrieve Reunions of the Client
$queryReunions = "SELECT reunionID, date, videoLink, subject, lawyerID
                  FROM reunion
                  WHERE clinetID = '$clientID'";
$resultReunions = $conn->query($queryReunions);

if ($resultReunions && $resultReunions->num_rows > 0) {
    $reunions = [];
    while ($row = $resultReunions->fetch_assoc()) {
        $reunionID = $row['reunionID'];
        $date = $row['date'];
        $videoLink = $row['videoLink'];
        $subject = $row['subject'];
        $lawyerID = $row['lawyerID'];

      
        // Second Query: Get UserID of Lawyer from Lawyer Table
        $queryUserID = "SELECT userID FROM lawyer WHERE id = '$lawyerID'";
        $resultUserID = $conn->query($queryUserID);
        
        if ($resultUserID && $resultUserID->num_rows > 0) {
            $rowUserID = $resultUserID->fetch_assoc();
            $userID = $rowUserID['userID'];
            // Third Query: Get User Information of Lawyer from User Table
            $queryUserInfo = "SELECT name AS lawyerName, lastname AS lawyerLastname, profilePic AS lawyerProfilePic
                              FROM user
                              WHERE userID = '$userID'";
            $resultUserInfo = $conn->query($queryUserInfo);
            
            if ($resultUserInfo && $resultUserInfo->num_rows > 0) {
                $rowUserInfo = $resultUserInfo->fetch_assoc();
                $lawyerName = $rowUserInfo['lawyerName'];
                $lawyerLastname = $rowUserInfo['lawyerLastname'];
                $lawyerProfilePic = $rowUserInfo['lawyerProfilePic'];
                
                // Construct reunion object with lawyer information
                $reunion = [
                    "reunionID" => $reunionID,
                    "date" => $date,
                    "videoLink" => $videoLink,
                    "subject" => $subject,
                    "lawyerName" => $lawyerName,
                    "lawyerLastname" => $lawyerLastname,
                    "lawyerProfilePic" => $lawyerProfilePic
                ];
                $reunions[] = $reunion;
            }
        }
    }
    
    echo json_encode(["success" => true, "reunions" => $reunions]);
} else {
    echo json_encode(["error" => "No reunions found for the provided client ID"]);
}

$conn->close();
?>
