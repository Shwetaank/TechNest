import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().min(1, 'DATABASE_URL is required'),
  DIRECT_URL: z.string().min(1, 'DIRECT_URL is required'),
  SUPABASE_URL: z.string().min(1, 'SUPABASE_URL is required'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1, 'SUPABASE_SERVICE_ROLE_KEY is required'),
  SUPABASE_JWT_SECRET: z.string().default('technest_super_secret_jwt_key_2026'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().min(1, 'JWT_SECRET is required'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  RAZORPAY_KEY_ID: z.string().default('rzp_test_technest2026'),
  RAZORPAY_KEY_SECRET: z.string().default('razorpay_secret_key_2026'),
  STRIPE_SECRET_KEY: z.string().default('sk_test_technest_stripe_2026'),
  SMTP_HOST: z.string().default('smtp.mailtrap.io'),
  SMTP_PORT: z.string().default('587'),
  SMTP_USER: z.string().default('technest_mail'),
  SMTP_PASS: z.string().default('technest_pass'),
  SMTP_FROM: z.string().default('TechNest Store <noreply@technest.store>'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid Environment Variables Configuration:', _env.error.format());
  throw new Error('Invalid environment configuration');
}

export const config = _env.data;
