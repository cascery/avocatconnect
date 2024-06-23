<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    die(json_encode(["success" => false, "error" => "Email or password cannot be empty"]));
}

$query = "SELECT * FROM user INNER JOIN client ON user.userID = client.userID WHERE email = '{$email}' AND password = '{$password}' AND userType = 'client'";
$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $clientId = $row['clientID'];
        $userID = $row['userID'];

        echo json_encode(["success" => true, "clientId" => $clientId,"userID" => $userID]);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid email or password"]);
    }
}  else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
