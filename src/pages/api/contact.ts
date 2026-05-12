import type { NextApiRequest, NextApiResponse } from 'next';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  // Basic validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' });
  }

  // Sanitize inputs (basic)
  const sanitizedName = String(name).slice(0, 100);
  const sanitizedEmail = String(email).slice(0, 100);
  const sanitizedSubject = String(subject).slice(0, 200);
  const sanitizedMessage = String(message).slice(0, 5000);

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        service_id: process.env.EMAILJS_SERVICE_ID,
        template_id: process.env.EMAILJS_TEMPLATE_ID,
        user_id: process.env.EMAILJS_PUBLIC_KEY,
        template_params: {
          from_name: sanitizedName,
          from_email: sanitizedEmail,
          subject: sanitizedSubject,
          message: sanitizedMessage,
        },
      }),
    });

    if (!response.ok) {
      // Log error internally, don't expose to client
      console.error('EmailJS error:', await response.text());
      return res.status(500).json({ error: 'Failed to send email' });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}