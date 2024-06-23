<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

$servername = "41.111.198.131";
$username = "lega";
$password = "e23kEJrE";
$dbname = "lega";

$conn = new mysqli($host, $username, $password, $database);

if ($conn->connect_error) {
    die(json_encode(["success" => false, "error" => "Connection failed: " . $conn->connect_error]));
}

// Get the userID from the POST data (assuming it's provided as 'userID')
$userID = $_POST['userID'];

// Step 2: Query the database to find questions asked by the client
$queryQuestions = "SELECT * FROM question WHERE userID = $userID";
$resultQuestions = $conn->query($queryQuestions);

if ($resultQuestions) {
    $responseData = [];

    while ($question = $resultQuestions->fetch_assoc()) {
        $forumID = $question['forumID'];
        // Step 3: Query the database to find comments made by lawyers for each question
        $queryComments = "SELECT  c.lawyerID, c.forumID 
                          FROM comments c 
                          
                          WHERE c.forumID = $forumID 
                          ";
              

        $resultComments = $conn->query($queryComments);

        if ($resultComments && $resultComments->num_rows > 0) {
            while ($comment = $resultComments->fetch_assoc()) {
                $lawyerID = $comment['lawyerID'];
                                // Query to fetch information about the lawyer from the user table
                $queryLawyerInfo = "SELECT * FROM user WHERE userID IN (
                                        SELECT userID FROM lawyer WHERE id = $lawyerID
                                    )";
                $resultLawyerInfo = $conn->query($queryLawyerInfo);

                if ($resultLawyerInfo && $resultLawyerInfo->num_rows > 0) {
                    $lawyerInfo = $resultLawyerInfo->fetch_assoc();

                    // Step 4: Send the relevant data back to the frontend
                    $responseData[] = array(
                        'lawyerInfo' => $lawyerInfo,
                        'forumID' => $comment['forumID']
                    );
                }
            }
        }
    }

    // Send the response back to the frontend
    echo json_encode(["success" => true, "notifications" => $responseData]);
} else {
    echo json_encode(["success" => false, "error" => "Failed to fetch questions"]);
}

$conn->close();
?>
