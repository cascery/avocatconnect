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
$wilaya = $_POST['city'] ?? ''; // Assuming city is supposed to be inserted into wilaya
$education = $_POST['education'] ?? '';

$getSpecialityIdQuery = "SELECT specialityID FROM speciality WHERE specialityID = $specialty";
$result = $conn->query($getSpecialityIdQuery);

if (!$result) {
    echo json_encode(["success" => false, "error" => $conn->error]);
    exit();
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $specialityID = $row['specialityID'];
} else {
    echo json_encode(["success" => false, "error" => "Specialty not found"]);
    exit();
}

$query = "INSERT INTO user (name, lastname, birthday, email, tel, username, password, creationDate,usertype, wilaya)
          VALUES ('$name', '$lastname', '$birth', '$email', '$phone', '$username', '$password', NOW(),'lawyer', '$wilaya')";

if ($conn->query($query) === TRUE) {
    $userID = $conn->insert_id; 
  

    $query = "INSERT INTO lawyer (userID, specialite, years, education)
              VALUES ('$userID', '$specialityID', '$years', '$education')";

    if ($conn->query($query) === TRUE) {
        echo json_encode(["success" => true, "userID" => $userID]); 
    } else {
        echo json_encode(["success" => false, "error" => $conn->error]);
    }
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
