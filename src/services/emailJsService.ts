// EmailJS Service - Fully Automated Email System
// Works directly from browser without any server

interface EmailJSTemplateParams {
  name: string;
  email: string;
  phone: string;
  message: string;
  subject: string;
  timestamp: string;
}

class EmailJSService {
  private readonly SERVICE_ID = 'service_your_service_id';
  private readonly TEMPLATE_ID = 'template_your_template_id';
  private readonly PUBLIC_KEY = 'your_public_key';

  async sendEmail(params: EmailJSTemplateParams): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      // Initialize EmailJS
      const emailjs = (window as any).emailjs;
      
      if (!emailjs) {
        throw new Error('EmailJS not loaded. Please check script tag.');
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        this.SERVICE_ID,
        this.TEMPLATE_ID,
        {
          to_name: 'Global Pass Team',
          from_name: params.name,
          from_email: params.email,
          phone: params.phone,
          message: params.message,
          subject: params.subject,
          timestamp: params.timestamp,
          reply_to: params.email
        },
        this.PUBLIC_KEY
      );

      console.log('Email sent successfully:', response);
      
      return { 
        success: true, 
        message: 'Email sent successfully to info@globalpasscareer.com and amankk0007@gmail.com'
      };
    } catch (error) {
      console.error('EmailJS Error:', error);
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to send email'
      };
    }
  }

  // Alternative: Use Formspree (works from browser)
  async sendViaFormspree(params: EmailJSTemplateParams): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const FORMSPREE_ENDPOINT = 'https://formspree.io/f/your_form_id';
      
      const formData = new FormData();
      formData.append('name', params.name);
      formData.append('email', params.email);
      formData.append('phone', params.phone);
      formData.append('message', params.message);
      formData.append('subject', params.subject);
      
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        return { success: true, message: 'Email sent via Formspree' };
      } else {
        throw new Error('Formspree submission failed');
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Formspree error' };
    }
  }

  // Alternative: Use Web3Forms (free HTML form service)
  async sendViaWeb3Forms(params: EmailJSTemplateParams): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const WEB3FORMS_ACCESS_KEY = 'your_web3forms_access_key';
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: params.subject,
          from_name: params.name,
          from_email: params.email,
          phone: params.phone,
          message: params.message,
          // Send to both admin emails
          to: ['info@globalpasscareer.com', 'amankk0007@gmail.com']
        })
      });

      const result = await response.json();
      
      if (result.success) {
        return { success: true, message: 'Email sent via Web3Forms' };
      } else {
        throw new Error(result.message || 'Web3Forms failed');
      }
    } catch (error) {
      return { success: false, error: error instanceof Error ? error.message : 'Web3Forms error' };
    }
  }
}

export const emailJsService = new EmailJSService();
