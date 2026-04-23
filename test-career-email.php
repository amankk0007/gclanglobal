<?php
// Simple test for career assessment email
header('Content-Type: text/html; charset=utf-8');

// Resend API configuration
$apiKey = 're_1499du8R_QBU3jRAHSG6634KScyU6TygP';
$apiUrl = 'https://api.resend.com/emails';

// Test data (simulating career assessment)
$testData = [
    'name' => 'Test User',
    'email' => 'test@example.com',
    'phone' => '+91 98765 43210',
    'profile' => 'creative',
    'title' => 'Creative Visionary',
    'description' => 'Test description for career assessment',
    'careers' => ['UI/UX Designer', 'Brand Strategist', 'Content Creator'],
    'answers' => [
        'q1' => 'creative',
        'q2' => 'analytical',
        'q3' => 'remote',
        'q4' => 'passion',
        'q5' => 'arts'
    ]
];

// Admin emails
$adminEmails = ['info@globalpasscareer.com', 'amankk0007@gmail.com'];

// Generate test email content
$timestamp = date('Y-m-d H:i:s');
$formDetails = '
    <h3>Career Assessment Test</h3>
    <p><strong>Name:</strong> ' . htmlspecialchars($testData['name']) . '</p>
    <p><strong>Email:</strong> ' . htmlspecialchars($testData['email']) . '</p>
    <p><strong>Phone:</strong> ' . htmlspecialchars($testData['phone']) . '</p>
    <p><strong>Profile Type:</strong> ' . htmlspecialchars($testData['profile']) . '</p>
    <p><strong>Career Title:</strong> ' . htmlspecialchars($testData['title']) . '</p>
    <p><strong>Description:</strong> ' . htmlspecialchars($testData['description']) . '</p>
    <p><strong>Suggested Careers:</strong> ' . htmlspecialchars(implode(', ', $testData['careers'])) . '</p>
    <p><strong>Assessment Answers:</strong></p>
    <pre>' . htmlspecialchars(json_encode($testData['answers'], JSON_PRETTY_PRINT)) . '</pre>
';

$emailContent = '
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <style>
            body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
            .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #1e40af 0%, #2563EB 50%, #7C3AED 100%); color: white; padding: 30px; text-align: center; }
            .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
            .header p { margin: 10px 0 0 0; opacity: 0.9; }
            .content { padding: 30px; }
            .footer { background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
            .form-details { background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0; }
            .form-details h3 { color: #2563EB; margin-top: 0; }
            .form-details p { margin: 10px 0; line-height: 1.6; }
            .form-details strong { color: #333; }
            pre { background-color: #f1f1f1; padding: 15px; border-radius: 5px; overflow-x: auto; font-size: 12px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Global Pass Career Consultancy</h1>
                <p>TEST - Career Assessment Email</p>
            </div>
            <div class="content">
                <p><strong>Test Time:</strong> ' . $timestamp . '</p>
                <div class="form-details">
                    ' . $formDetails . '
                </div>
                <p><strong>This is a test email to verify the career assessment email functionality.</strong></p>
            </div>
            <div class="footer">
                <p>&copy; 2024 Global Pass Career Consultancy Inc. All rights reserved.</p>
                <p>Email: info@globalpasscareer.com | Phone: +91 75088 13555</p>
            </div>
        </div>
    </body>
    </html>
';

echo "<h2>Testing Career Assessment Email</h2>";

// Send to each admin email
foreach ($adminEmails as $email) {
    echo "<h3>Testing email to: " . htmlspecialchars($email) . "</h3>";
    
    $emailData = [
        'from' => 'noreply@globalpasscareer.com',
        'to' => [$email],
        'subject' => 'TEST - Career Assessment Email - Global Pass Career',
        'html' => $emailContent
    ];
    
    $ch = curl_init($apiUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_POST, true);
    curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($emailData));
    curl_setopt($ch, CURLOPT_HTTPHEADER, [
        'Content-Type: application/json',
        'Authorization: Bearer ' . $apiKey
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $error = curl_error($ch);
    curl_close($ch);
    
    echo "<p><strong>HTTP Status:</strong> " . $httpCode . "</p>";
    echo "<p><strong>CURL Error:</strong> " . ($error ? $error : 'None') . "</p>";
    echo "<p><strong>Response:</strong></p>";
    echo "<pre>" . htmlspecialchars($response) . "</pre>";
    echo "<hr>";
}

echo "<h2>Test Complete</h2>";
echo "<p>If you see this page, the PHP script is working. Check your email inboxes for test emails.</p>";
?>
