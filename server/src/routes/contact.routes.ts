import { Router } from 'express';
import { sendEmail } from '../services/emailService.js';
import { sendResponse } from '../utils/responseHandler.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!email || !message) {
    return sendResponse(res, 400, 'Name, email, and message are required', {}, {}, ['Missing required fields']);
  }

  // 1. Send confirmation email to customer via Resend
  await sendEmail({
    to: email,
    subject: `⚡ Support Request Received: ${subject || 'TechNest Hardware Inquiry'}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #0f172a;">
        <h2>Hello ${name || 'Customer'},</h2>
        <p>Thank you for reaching out to TechNest Hardware Support. Our engineering team has received your ticket and will respond within 2 hours.</p>
        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 15px; rounded: 8px; margin: 15px 0;">
          <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
          <p><strong>Message:</strong> ${message}</p>
        </div>
        <p style="font-size: 12px; color: #64748b;">TechNest Support Team • Bengaluru, KA - 560001</p>
      </div>
    `,
  });

  return sendResponse(res, 200, 'Contact support ticket created and email sent via Resend', {
    name,
    email,
    subject,
  });
});

export default router;
