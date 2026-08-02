import { Router } from 'express';
import { sendEmail } from '../services/emailService.js';
import { sendResponse } from '../utils/responseHandler.js';

const router = Router();

router.post('/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return sendResponse(res, 400, 'Valid email address is required', {}, {}, ['Invalid email']);
  }

  // Send Welcome Email via Resend Service
  await sendEmail({
    to: email,
    subject: '⚡ Welcome to TechNest Store Enterprise Hardware Launch Alerts',
    html: `
      <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
        <h2>Welcome to TechNest Store Alerts</h2>
        <p>Thank you for subscribing to TechNest hardware updates!</p>
        <p>You will receive early access alerts for flagship GPU launches, RTX 5090 Desktop rigs, and liquid-cooled workstation drops.</p>
        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 20px 0;" />
        <p style="font-size: 12px; color: #64748b;">TechNest Store Inc. • Bengaluru, KA, India</p>
      </div>
    `,
  });

  return sendResponse(res, 200, 'Successfully subscribed to hardware launch alerts', { email });
});

export default router;
