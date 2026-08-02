import dotenv from 'dotenv';
import { z } from 'zod';

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default('5000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  DATABASE_URL: z.string().default('postgresql://postgres.jgcvqbjveevmibehceym:Shwetank%40123@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'),
  DIRECT_URL: z.string().default('postgresql://postgres.jgcvqbjveevmibehceym:Shwetank%40123@aws-1-ap-south-1.pooler.supabase.com:5432/postgres'),
  SUPABASE_URL: z.string().default('https://jgcvqbjveevmibehceym.supabase.co'),
  SUPABASE_SERVICE_ROLE_KEY: z.string().default('sb_publishable__mneBqzqnNOPM0MCSYC9KA_TDbsET6B'),
  SUPABASE_JWT_SECRET: z.string().default('technest_super_secret_jwt_key_2026'),
  REDIS_URL: z.string().default('redis://localhost:6379'),
  JWT_SECRET: z.string().default('technest_production_jwt_signing_secret_987654321'),
  JWT_EXPIRES_IN: z.string().default('1d'),
  REFRESH_TOKEN_EXPIRES_IN: z.string().default('7d'),
  PAYMENT_GATEWAY_DRIVER: z.string().default('dummy'),
  STRIPE_SECRET_KEY: z.string().default('sk_test_technest_stripe_2026'),
  RESEND_API_KEY: z.string().default('re_123456789_technest_resend_key'),
  RESEND_FROM_EMAIL: z.string().default('TechNest Store <onboarding@resend.dev>'),
  CORS_ORIGIN: z.string().default('http://localhost:5173'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid Environment Variables Configuration:', _env.error.format());
  throw new Error('Invalid environment configuration');
}

export const config = _env.data;
