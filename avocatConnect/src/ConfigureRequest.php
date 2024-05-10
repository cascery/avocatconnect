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
$lawyerId = $_POST['lawyerId'] ?? '';
if (empty($requestId) || empty($lawyerId)) {
    die(json_encode(["error" => "Request ID or Lawyer ID not provided"]));
}

// Retrieve client details along with the service request information
$query = "SELECT sr.content, u.userID, u.name, u.lastname, u.birthday, u.wilaya, u.email, u.tel, u.profilePic, u.username, u.password, u.usertype, sr.clientID
          FROM user u
          INNER JOIN servicerequest sr ON u.userID = sr.clientID
          WHERE sr.serviceRequestID = $requestId";
$result = $conn->query($query);

if ($result && $result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $userDetails = [
        "content" => $row['content'],
        "name" => $row['name'],
        "lastname" => $row['lastname'],
        "birthday" => $row['birthday'],
        "wilaya" => $row['wilaya'],
        "email" => $row['email'],
        "tel" => $row['tel'],
        "profilePic" => base64_encode($row['profilePic']),
        "username" => $row['username'],
    ];
    
   
    
    echo json_encode(["success" => true, "userDetails" => $userDetails]);
} else {
    echo json_encode(["success" => false, "error" => "User details not found"]);
}

$conn->close();
?>
