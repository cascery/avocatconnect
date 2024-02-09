
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

$searchQuery = $_GET['id'] ?? '';

if (empty($searchQuery)) {
    die(json_encode(["success" => false, "error" => "Search query cannot be empty"]));
}

$query = "SELECT * FROM avocat WHERE id = $searchQuery";
$result = $conn->query($query);

if ($result) {
    if ($result->num_rows > 0) {
        $lawyers = array();
        while ($row = $result->fetch_assoc()) {
            $base64Image = base64_encode($row['profilePhoto']);

            // Assign the Base64-encoded string to the 'profilePhoto' field
            $row['profilePhoto'] = $base64Image;
            $lawyers[] = $row;
        }
        echo json_encode(["success" => true, "lawyers" => $lawyers]);
    } else {
        echo json_encode(["success" => true, "message" => "No lawyers found"]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
