<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit;
}

try {
    $data = json_decode(file_get_contents('php://input'), true);
    
    if (!$data || !isset($data['formData']) || !isset($data['formType'])) {
        throw new Exception('Invalid request data');
    }
    
    $formData = $data['formData'];
    $formType = $data['formType'];
    
    // Resend API configuration
    $apiKey = 're_1499du8R_QBU3jRAHSG6634KScyU6TygP';
    $apiUrl = 'https://api.resend.com/emails';
    
    // Admin emails
    $adminEmails = ['info@globalpasscareer.com', 'amankk0007@gmail.com'];
    
    // Generate email content based on form type
    $emailContent = generateEmailContent($formData, $formType);
    $subject = 'New ' . ucfirst($formType) . ' Form Submission - Global Pass Career';
    
    // Send to admin emails
    $successCount = 0;
    foreach ($adminEmails as $email) {
        $emailData = [
            'from' => 'noreply@globalpasscareer.com',
            'to' => [$email],
            'subject' => $subject,
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
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, true);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $curlError = curl_error($ch);
        curl_close($ch);
        
        if ($httpCode === 200) {
            $successCount++;
            error_log('Successfully sent email to ' . $email);
        } else {
            error_log('Failed to send email to ' . $email . '. HTTP Code: ' . $httpCode . '. Response: ' . $response . '. CURL Error: ' . $curlError);
        }
    }
    
    if ($successCount === 0) {
        throw new Exception('Failed to send any emails. Check error logs for details.');
    }
    
    // If user provided email, send confirmation
    if (isset($formData['email']) && 
        !in_array($formData['email'], $adminEmails)) {
        
        $confirmationContent = generateConfirmationEmail($formData, $formType);
        $confirmationData = [
            'from' => 'noreply@globalpasscareer.com',
            'to' => [$formData['email']],
            'subject' => 'Thank you for your ' . $formType . ' submission - Global Pass Career',
            'html' => $confirmationContent
        ];
        
        $ch = curl_init($apiUrl);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_POST, true);
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($confirmationData));
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $apiKey
        ]);
        
        curl_exec($ch);
        curl_close($ch);
    }
    
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

function generateEmailContent($formData, $formType) {
    $timestamp = date('Y-m-d H:i:s');
    
    $formDetails = '';
    switch ($formType) {
        case 'contact':
            $formDetails = '
                <h3>Contact Form Details</h3>
                <p><strong>Name:</strong> ' . htmlspecialchars($formData['name']) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($formData['email']) . '</p>
                <p><strong>Phone:</strong> ' . htmlspecialchars($formData['phone']) . '</p>
                <p><strong>Subject:</strong> ' . htmlspecialchars($formData['subject']) . '</p>
                <p><strong>Message:</strong></p>
                <p>' . htmlspecialchars($formData['message']) . '</p>
            ';
            break;
        case 'application':
            $formDetails = '
                <h3>Application Form Details</h3>
                <p><strong>Name:</strong> ' . htmlspecialchars($formData['name']) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($formData['email']) . '</p>
                <p><strong>Phone:</strong> ' . htmlspecialchars($formData['phone']) . '</p>
                <p><strong>Education:</strong> ' . htmlspecialchars($formData['education']) . '</p>
                <p><strong>Course:</strong> ' . htmlspecialchars($formData['course']) . '</p>
                <p><strong>Destination:</strong> ' . htmlspecialchars($formData['destination']) . '</p>
                <p><strong>Message:</strong></p>
                <p>' . htmlspecialchars($formData['message']) . '</p>
            ';
            break;
        case 'admission':
            $formDetails = '
                <h3>Admission Form Details</h3>
                <p><strong>Name:</strong> ' . htmlspecialchars($formData['name']) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($formData['email']) . '</p>
                <p><strong>Phone:</strong> ' . htmlspecialchars($formData['phone']) . '</p>
                <p><strong>Education:</strong> ' . htmlspecialchars($formData['education']) . '</p>
                <p><strong>Course:</strong> ' . htmlspecialchars($formData['course']) . '</p>
                <p><strong>Destination:</strong> ' . htmlspecialchars($formData['destination']) . '</p>
                <p><strong>Date of Birth:</strong> ' . htmlspecialchars($formData['dob'] ?? 'N/A') . '</p>
                <p><strong>Address:</strong> ' . htmlspecialchars($formData['address'] ?? 'N/A') . '</p>
                <p><strong>Message:</strong></p>
                <p>' . htmlspecialchars($formData['message']) . '</p>
            ';
            break;
        case 'career':
            $formDetails = '
                <h3>Career Assessment Details</h3>
                <p><strong>Name:</strong> ' . htmlspecialchars($formData['name']) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($formData['email']) . '</p>
                <p><strong>Phone:</strong> ' . htmlspecialchars($formData['phone']) . '</p>
                <p><strong>Profile Type:</strong> ' . htmlspecialchars($formData['profile']) . '</p>
                <p><strong>Career Title:</strong> ' . htmlspecialchars($formData['title']) . '</p>
                <p><strong>Description:</strong> ' . htmlspecialchars($formData['description']) . '</p>
                <p><strong>Suggested Careers:</strong> ' . htmlspecialchars(implode(', ', $formData['careers'] ?? [])) . '</p>
                <p><strong>Assessment Answers:</strong></p>
                <pre>' . htmlspecialchars(json_encode($formData['answers'], JSON_PRETTY_PRINT)) . '</pre>
            ';
            break;
        case 'lead':
            $formDetails = '
                <h3>Lead Form Details</h3>
                <p><strong>Name:</strong> ' . htmlspecialchars($formData['name']) . '</p>
                <p><strong>Email:</strong> ' . htmlspecialchars($formData['email']) . '</p>
                <p><strong>Phone:</strong> ' . htmlspecialchars($formData['phone']) . '</p>
                <p><strong>Education:</strong> ' . htmlspecialchars($formData['education']) . '</p>
                <p><strong>Subject:</strong> ' . htmlspecialchars($formData['subject']) . '</p>
                <p><strong>Message:</strong></p>
                <p>' . htmlspecialchars($formData['message']) . '</p>
            ';
            break;
        default:
            $formDetails = '<pre>' . htmlspecialchars(json_encode($formData, JSON_PRETTY_PRINT)) . '</pre>';
    }
    
    return '
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
                    <p>New ' . ucfirst($formType) . ' Form Submission</p>
                </div>
                <div class="content">
                    <p><strong>Submission Time:</strong> ' . $timestamp . '</p>
                    <div class="form-details">
                        ' . $formDetails . '
                    </div>
                    <p><strong>Action Required:</strong> Please review this submission and contact the person as soon as possible.</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Global Pass Career Consultancy Inc. All rights reserved.</p>
                    <p>Email: info@globalpasscareer.com | Phone: +1-437-243-6322</p>
                </div>
            </div>
        </body>
        </html>
    ';
}

function generateConfirmationEmail($formData, $formType) {
    return '
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="UTF-8">
            <style>
                body { font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
                .container { max-width: 600px; margin: 0 auto; background-color: white; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
                .header { background: linear-gradient(135deg, #1e40af 0%, #2563EB 50%, #7C3AED 100%); color: white; padding: 30px; text-align: center; }
                .header h1 { margin: 0; font-size: 28px; font-weight: 700; }
                .content { padding: 30px; }
                .footer { background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h1>Global Pass Career Consultancy</h1>
                    <p>Thank You for Your Submission!</p>
                </div>
                <div class="content">
                    <h2>Dear ' . htmlspecialchars($formData['name']) . ',</h2>
                    <p>Thank you for submitting your ' . $formType . ' form to Global Pass Career Consultancy. We have received your submission and our team will review it shortly.</p>
                    <p><strong>What happens next?</strong></p>
                    <ul>
                        <li>Our team will review your submission within 24-48 hours</li>
                        <li>We will contact you via email or phone to discuss the next steps</li>
                        <li>If you have any urgent questions, please call us at +1-437-243-6322</li>
                    </ul>
                    <p>We look forward to helping you achieve your career and educational goals!</p>
                    <p><strong>Best regards,</strong><br>
                    Global Pass Career Consultancy Team</p>
                </div>
                <div class="footer">
                    <p>&copy; 2024 Global Pass Career Consultancy Inc. All rights reserved.</p>
                    <p>Email: info@globalpasscareer.com | Phone: +1-437-243-6322</p>
                </div>
            </div>
        </body>
        </html>
    ';
}
?>
