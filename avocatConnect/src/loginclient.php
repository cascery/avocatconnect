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
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}


$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    die(json_encode(["success" => false, "error" => "Email or password cannot be empty"]));
}

$query = "SELECT * FROM client WHERE email = '{$email}' AND password = '{$password}'";
$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        echo json_encode(["success" => true]);
    } else {
        echo json_encode(["success" => false, "error" => "Invalid email or password"]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
