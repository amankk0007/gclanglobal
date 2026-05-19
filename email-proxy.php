<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['from']) && isset($data['to']) && isset($data['subject']) && isset($data['html'])) {
    $to = is_array($data['to']) ? $data['to'] : [$data['to']];
    
    // Use Resend API
    $resendData = [
        'from' => $data['from'],
        'to' => $to,
        'subject' => $data['subject'],
        'html' => $data['html'],
        'text' => $data['text'] ?? strip_tags($data['html'])
    ];
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, 'https://api.resend.com/emails');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($resendData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Authorization: re_UZvCd9JV_J6kPgjNL1D5SwxpJ6bRbnJev',
        'Content-Type: application/json'
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    $result = json_decode($response, true);
    
    if ($httpCode === 200 && isset($result->id)) {
        echo json_encode([
            'success' => true,
            'message' => 'Email sent successfully via Resend',
            'sent_to' => $to,
            'details' => $resendData
        ]);
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'Failed to send email via Resend',
            'error' => $result->message ?? 'Unknown error',
            'http_code' => $httpCode,
            'sent_to' => $to,
            'details' => $resendData
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields',
        'received' => $data
    ]);
}
?>
