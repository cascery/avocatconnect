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
$lastname= $_POST['lastname'] ?? '';
$username = $_POST['username'] ?? '';
$phone = $_POST['phone'] ?? '';
$adress = $_POST['adress'] ?? '';
$years = $_POST['years'] ?? '';
$birth= $_POST['birth']??'';


$specialitename = "Droit rural";


$fetchSpecialtyIdQuery = "SELECT specialiteID FROM specialite WHERE specialite = 'Droit%rural'";
$result = $conn->query($fetchSpecialtyIdQuery);
if (!$result) {
    echo 'Error executing the query: ' . $conn->error;
    exit(); // Exit the script in case of an error
}

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    $specialite = $row['specialiteID']; 
    echo "specialite" .$specialite;
} else {
    echo 'Specialty not found';
    exit(); // Exit if the specialty is not found
}
$realspecialite=intval($specialite);

$query = "INSERT INTO avocat (username, nom, prenom, adressCabinet, tel, email, password,anne_travail,specialite,birthday )
          VALUES ('$username', '$name', '$lastname', '$adress', '$phone', '$email', '$password','$years','$specialite','$birth')";



if ($conn->query($query) === TRUE) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => $conn->error]);
}

$conn->close();
?>
