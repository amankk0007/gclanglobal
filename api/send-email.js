// API endpoint for sending emails
import { emailService } from '../src/services/emailService.js';

export async function POST({ request }) {
  try {
    const { formData, formType } = await request.json();
    
    // Send email using the email service
    await emailService.sendFormSubmission(formData, formType);
    
    return new Response(
      JSON.stringify({ success: true, message: 'Email sent successfully' }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error in send-email API:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message || 'Failed to send email' 
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}
