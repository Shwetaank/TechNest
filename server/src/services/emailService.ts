import { Resend } from 'resend';
import { config } from '../config/index.js';
import { logger } from '../utils/logger.js';

export const resend = new Resend(config.RESEND_API_KEY);

export interface SendEmailOptions {
  to: string | string[];
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  try {
    const response = await resend.emails.send({
      from: config.RESEND_FROM_EMAIL || 'onboarding@resend.dev',
      to,
      subject,
      html,
    });

    if (response.error) {
      logger.error({ error: response.error, to, subject }, '❌ Resend API returned error');
      return response;
    }

    logger.info({ to, subject, id: response.data?.id }, '📧 Email dispatched via Resend API');
    return response;
  } catch (error: any) {
    logger.error({ error: error?.message || error, to, subject }, '❌ Resend Email exception');
    return { data: null, error };
  }
}
