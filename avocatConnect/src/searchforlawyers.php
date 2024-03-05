<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

$host = 'localhost';
$username = 'root';
$password = '';
$database = 'connectlawyers';

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

$searchQuery = $_GET['searchQuery'] ?? '';

if (empty($searchQuery)) {
    die(json_encode(["success" => false, "error" => "Search query cannot be empty"]));
}

$searchParam = '%' . $conn->real_escape_string($searchQuery) . '%';
$query = "SELECT * lawyer WHERE nom LIKE ?";

$stmt = $conn->prepare($query);

if ($stmt) {
    $stmt->bind_param("s", $searchParam);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $lawyers = array();
        while ($row = $result->fetch_assoc()) {
            $base64Image = base64_encode($row['profilePhoto']);
            $row['profilePhoto'] = $base64Image;
            $lawyers[] = $row;
        }
        echo json_encode(["success" => true, "lawyers" => $lawyers]);
    } else {
        echo json_encode(["success" => true, "message" => "No lawyers found"]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
