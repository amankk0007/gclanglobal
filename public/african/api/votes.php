<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

$votesFile = __DIR__ . '/votes.json';

// Handle different request methods
$method = $_SERVER['REQUEST_METHOD'];

try {
    switch ($method) {
        case 'GET':
            // Get all votes
            if (file_exists($votesFile)) {
                $votes = json_decode(file_get_contents($votesFile), true);
                echo json_encode($votes);
            } else {
                echo json_encode([]);
            }
            break;
            
        case 'POST':
            // Add new vote
            $input = json_decode(file_get_contents('php://input'), true);
            
            if (!$input) {
                http_response_code(400);
                echo json_encode(['error' => 'Invalid input']);
                exit;
            }
            
            // Validate required fields
            $required = ['voterName', 'voterEmail', 'voterPhone', 'voterCountry', 'collegeName', 'courseName', 'semester', 'yearOfStudy', 'candidate', 'agreeTerms'];
            foreach ($required as $field) {
                if (empty($input[$field])) {
                    http_response_code(400);
                    echo json_encode(['error' => "Missing required field: $field"]);
                    exit;
                }
            }
            
            // Load existing votes
            $votes = [];
            if (file_exists($votesFile)) {
                $votes = json_decode(file_get_contents($votesFile), true);
            }
            
            // Add new vote with ID and timestamp
            $input['id'] = time() * 1000 + rand(0, 999);
            $input['timestamp'] = date('c');
            $votes[] = $input;
            
            // Save to file
            file_put_contents($votesFile, json_encode($votes, JSON_PRETTY_PRINT));
            
            echo json_encode(['success' => true, 'vote' => $input]);
            break;
            
        case 'DELETE':
            // Delete a vote
            $input = json_decode(file_get_contents('php://input'), true);
            $voteId = $input['id'] ?? null;
            
            if (!$voteId) {
                http_response_code(400);
                echo json_encode(['error' => 'Missing vote ID']);
                exit;
            }
            
            // Load existing votes
            if (!file_exists($votesFile)) {
                http_response_code(404);
                echo json_encode(['error' => 'No votes found']);
                exit;
            }
            
            $votes = json_decode(file_get_contents($votesFile), true);
            
            // Find and remove the vote
            $found = false;
            foreach ($votes as $key => $vote) {
                if ($vote['id'] == $voteId) {
                    unset($votes[$key]);
                    $found = true;
                    break;
                }
            }
            
            if (!$found) {
                http_response_code(404);
                echo json_encode(['error' => 'Vote not found']);
                exit;
            }
            
            // Re-index array and save
            $votes = array_values($votes);
            file_put_contents($votesFile, json_encode($votes, JSON_PRETTY_PRINT));
            
            echo json_encode(['success' => true]);
            break;
            
        default:
            http_response_code(405);
            echo json_encode(['error' => 'Method not allowed']);
            break;
    }
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
