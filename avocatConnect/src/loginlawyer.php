<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Start session

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

$query = "SELECT l.userID, u.email FROM lawyer l INNER JOIN user u ON l.userID = u.userID WHERE u.email = '{$email}' AND u.password = '{$password}'";
$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $lawyerId = $row['userID'];
        

        // Set lawyerId in session

        echo json_encode(["success" => true, "lawyerId" => $lawyerId]); // Include lawyerId in the response
    } else {
        echo json_encode(["success" => false, "error" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
