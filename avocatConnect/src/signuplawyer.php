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
    die("Connection failed: " . $conn->connect_error);
}

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$name = $_POST['name'] ?? '';
$lastname = $_POST['lastname'] ?? '';
$username = $_POST['username'] ?? '';
$phone = $_POST['phone'] ?? '';
$adress = $_POST['adress'] ?? '';
$years = $_POST['years'] ?? '';
$birth = $_POST['birth'] ?? '';
$specialty = $_POST['specialty'] ?? '';

// Retrieve the specialityID based on the selected index
$getSpecialityIdQuery = "SELECT specialityID FROM speciality WHERE specialityID = $specialty";

$result = $conn->query($getSpecialityIdQuery);
if (!$result) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit(); // Exit the script in case of an error
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $specialityID = $row['specialityID'];
} else {
    echo json_encode(["success" => false, "error" => "Specialty not found"]);
    exit(); // Exit if the specialty is not found
}

// Insert user data into the user table
$query = "INSERT INTO user (name, lastname, birthday, email, tel, username, password, creationDate)
          VALUES ('$name', '$lastname', '$birth', '$email', '$phone', '$username', '$password', NOW())";

if ($conn->query($query) === TRUE) {
    $userID = $conn->insert_id; // Get the auto-generated user ID

    // Insert lawyer-specific data into the lawyer table
    $query = "INSERT INTO lawyer (userID, specialite)
              VALUES ('$userID', '$specialityID')";

              if ($conn->query($query) === TRUE) {
                echo json_encode(["success" => true, "userID" => $userID]); // Return the userID in the response
            } else {
                echo json_encode(["success" => false, "error" => $conn->error]);
            }
        } else {
            echo json_encode(["success" => false, "error" => $conn->error]);
        }
$conn->close();
?>
