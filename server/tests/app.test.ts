import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app.js';

describe('Server Health & Observability Endpoints', () => {
  it('GET /health should return status 200 with OK message', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('TechNest API Health Status OK');
    expect(res.body.data.status).toBe('healthy');
  });

  it('GET /ready should return readiness probe', async () => {
    const res = await request(app).get('/ready');
    expect(res.status).toBe(200);
    expect(res.body.data.ready).toBe(true);
  });

  it('GET /live should return liveness probe', async () => {
    const res = await request(app).get('/live');
    expect(res.status).toBe(200);
    expect(res.body.data.alive).toBe(true);
  });
});
