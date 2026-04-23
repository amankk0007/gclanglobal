// Email Service using Resend API
const RESEND_API_KEY = 're_1499du8R_QBU3jRAHSG6634KScyU6TygP';
const RESEND_API_URL = 'https://api.resend.com/emails';

export interface EmailData {
  to: string[];
  subject: string;
  html: string;
  from?: string;
}

class EmailService {
  private readonly DEFAULT_FROM = 'noreply@globalpasscareer.com';
  private readonly ADMIN_EMAILS = [
    'info@globalpasscareer.com',
    'amankk0007@gmail.com'
  ];

  async sendEmail(emailData: EmailData): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const response = await fetch(RESEND_API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: emailData.from || this.DEFAULT_FROM,
          to: emailData.to,
          subject: emailData.subject,
          html: emailData.html,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Resend API error: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log('Email sent successfully:', result);
      
      return { 
        success: true, 
        message: 'Email sent successfully'
      };
    } catch (error) {
      console.error('Error sending email:', error);
      
      // Store failed email for retry
      this.storeFailedEmail(emailData, error);
      
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Unknown error occurred' 
      };
    }
  }

  async sendFormSubmission(formData: any, formType: 'contact' | 'application' | 'admission' | 'career' | 'lead'): Promise<void> {
    const emailContent = this.generateEmailContent(formData, formType);
    const subject = `New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Form Submission - Global Pass Career`;

    // Send to admin emails
    await this.sendEmail({
      to: this.ADMIN_EMAILS,
      subject,
      html: emailContent,
    });

    // If user provided email, send confirmation
    if (formData.email && formData.email !== this.ADMIN_EMAILS[0] && formData.email !== this.ADMIN_EMAILS[1]) {
      const confirmationContent = this.generateConfirmationEmail(formData, formType);
      await this.sendEmail({
        to: [formData.email],
        subject: `Thank you for your ${formType} submission - Global Pass Career`,
        html: confirmationContent,
      });
    }
  }

  private generateEmailContent(formData: any, formType: string): string {
    const timestamp = new Date().toLocaleString();
    
    let formDetails = '';
    switch (formType) {
      case 'contact':
        formDetails = `
          <h3>Contact Form Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `;
        break;
      case 'application':
        formDetails = `
          <h3>Application Form Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Education:</strong> ${formData.education}</p>
          <p><strong>Course:</strong> ${formData.course}</p>
          <p><strong>Destination:</strong> ${formData.destination}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `;
        break;
      case 'admission':
        formDetails = `
          <h3>Admission Form Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Education:</strong> ${formData.education}</p>
          <p><strong>Course:</strong> ${formData.course}</p>
          <p><strong>Destination:</strong> ${formData.destination}</p>
          <p><strong>Date of Birth:</strong> ${formData.dob}</p>
          <p><strong>Address:</strong> ${formData.address}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `;
        break;
      case 'career':
        formDetails = `
          <h3>Career Assessment Details</h3>
          <p><strong>Profile Type:</strong> ${formData.profile}</p>
          <p><strong>Career Title:</strong> ${formData.title}</p>
          <p><strong>Description:</strong> ${formData.description}</p>
          <p><strong>Suggested Careers:</strong> ${formData.careers ? formData.careers.join(', ') : 'N/A'}</p>
          <p><strong>Assessment Answers:</strong></p>
          <pre>${JSON.stringify(formData.answers, null, 2)}</pre>
        `;
        break;
      case 'lead':
        formDetails = `
          <h3>Lead Form Details</h3>
          <p><strong>Name:</strong> ${formData.name}</p>
          <p><strong>Email:</strong> ${formData.email}</p>
          <p><strong>Phone:</strong> ${formData.phone}</p>
          <p><strong>Education:</strong> ${formData.education}</p>
          <p><strong>Subject:</strong> ${formData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${formData.message}</p>
        `;
        break;
      default:
        formDetails = `<pre>${JSON.stringify(formData, null, 2)}</pre>`;
    }

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
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
            <p>New ${formType.charAt(0).toUpperCase() + formType.slice(1)} Form Submission</p>
          </div>
          <div class="content">
            <p><strong>Submission Time:</strong> ${timestamp}</p>
            <div class="form-details">
              ${formDetails}
            </div>
            <p><strong>Action Required:</strong> Please review this submission and contact the person as soon as possible.</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Global Pass Career Consultancy Inc. All rights reserved.</p>
            <p>Email: info@globalpasscareer.com | Phone: +91 75088 13555</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private generateConfirmationEmail(formData: any, formType: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f4f4f4; }
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
            <h2>Dear ${formData.name},</h2>
            <p>Thank you for submitting your ${formType} form to Global Pass Career Consultancy. We have received your submission and our team will review it shortly.</p>
            <p><strong>What happens next?</strong></p>
            <ul>
              <li>Our team will review your submission within 24-48 hours</li>
              <li>We will contact you via email or phone to discuss the next steps</li>
              <li>If you have any urgent questions, please call us at +91 75088 13555</li>
            </ul>
            <p>We look forward to helping you achieve your career and educational goals!</p>
            <p><strong>Best regards,</strong><br>
            Global Pass Career Consultancy Team</p>
          </div>
          <div class="footer">
            <p>&copy; 2024 Global Pass Career Consultancy Inc. All rights reserved.</p>
            <p>Email: info@globalpasscareer.com | Phone: +91 75088 13555</p>
          </div>
        </div>
      </body>
      </html>
    `;
  }

  private storeFailedEmail(emailData: EmailData, error: any): void {
    const failedEmails = JSON.parse(localStorage.getItem('failed_emails') || '[]');
    failedEmails.push({
      emailData,
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    });
    localStorage.setItem('failed_emails', JSON.stringify(failedEmails));
  }

  async retryFailedEmails(): Promise<void> {
    const failedEmails = JSON.parse(localStorage.getItem('failed_emails') || '[]');
    const remainingFailedEmails = [];

    for (const failedEmail of failedEmails) {
      const result = await this.sendEmail(failedEmail.emailData);
      if (!result.success) {
        remainingFailedEmails.push(failedEmail);
      }
    }

    localStorage.setItem('failed_emails', JSON.stringify(remainingFailedEmails));
  }

  getFailedEmails(): any[] {
    return JSON.parse(localStorage.getItem('failed_emails') || '[]');
  }
}

export const emailService = new EmailService();
