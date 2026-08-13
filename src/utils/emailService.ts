import emailjs from '@emailjs/browser';

// EmailJS configuration from environment variables (Vite requires VITE_ prefix)
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  inquiryType: string;
}

function validateConfig() {
  const missing: string[] = [];
  if (!SERVICE_ID || SERVICE_ID === 'your_service_id_here') missing.push('VITE_EMAILJS_SERVICE_ID');
  if (!TEMPLATE_ID || TEMPLATE_ID === 'your_template_id_here') missing.push('VITE_EMAILJS_TEMPLATE_ID');
  if (!PUBLIC_KEY || PUBLIC_KEY === 'your_public_key_here') missing.push('VITE_EMAILJS_PUBLIC_KEY');
  return missing;
}

export const sendEmail = async (formData: ContactFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Debug logging
    console.log('EmailJS Config Check:');
    console.log('SERVICE_ID:', SERVICE_ID);
    console.log('TEMPLATE_ID:', TEMPLATE_ID);
    console.log('PUBLIC_KEY:', PUBLIC_KEY ? 'SET' : 'NOT SET');
    
    const missing = validateConfig();
    console.log('Missing config:', missing);
    
    if (missing.length > 0) {
      // For development/demo purposes, show a mailto link
      const emailBody = encodeURIComponent(
        `Name: ${formData.name}\n` +
        `Email: ${formData.email}\n` +
        `Inquiry Type: ${formData.inquiryType}\n` +
        `Subject: ${formData.subject}\n\n` +
        `Message:\n${formData.message}`
      );
      
      const mailtoLink = `mailto:kwanlamarblounthill@gmail.com?subject=${encodeURIComponent(formData.subject)}&body=${emailBody}`;
      
      // Open default email client
      window.open(mailtoLink, '_self');
      
      return {
        success: true,
        message: 'Opening your default email client to send the message. If it didn\'t open, please try the form again in a moment.'
      };
    }

    // Initialize EmailJS with your public key
    emailjs.init(PUBLIC_KEY!);

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      to_email: 'kwanlamarblounthill@gmail.com',
      to_name: 'Kwan Blount-Hill',
      subject: formData.subject,
      message: formData.message,
      inquiry_type: formData.inquiryType,
      reply_to: formData.email
    };

    const response = await emailjs.send(SERVICE_ID!, TEMPLATE_ID!, templateParams);
    
    if (response.status === 200) {
      return {
        success: true,
        message: 'Your message has been sent successfully! I\'ll get back to you within 24 hours.'
      };
    } else {
      return {
        success: false,
        message: 'There was an issue sending your message. Please try again in a moment.'
      };
    }
  } catch (error) {
    console.error('EmailJS error:', error);
    return {
      success: false,
      message: 'There was an issue sending your message. Please try again in a moment.'
    };
  }
};
