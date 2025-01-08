import request from 'supertest';
    import app from '../app';
    import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import { createToken } from '../lib/auth';

    describe('API Tests', () => {
      let db;
      let authToken;

      beforeAll(async () => {
        db = await open({
          filename: './test.db',
          driver: sqlite3.Database
        });

        // Create test user
        await db.run(
          `INSERT INTO users (name, email, password, package)
          VALUES (?, ?, ?, ?)`,
          ['Test User', 'test@example.com', 'password', 'basic']
        );

        authToken = await createToken(1);
      });

      afterAll(async () => {
        await db.close();
      });

      test('GET /api/v1/health should return healthy status', async () => {
        const response = await request(app)
          .get('/api/v1/health')
          .set('Authorization', `Bearer ${authToken}`);

        expect(response.statusCode).toBe(200);
        expect(response.body.status).toBe('healthy');
      });

      test('POST /api/register should create new user', async () => {
        const response = await request(app)
          .post('/api/register')
          .send({
            name: 'New User',
            email: 'new@example.com',
            password: 'password123',
            subdomain: 'newuser',
            package: 'basic'
          });

        expect(response.statusCode).toBe(200);
        expect(response.body.userId).toBeDefined();
      });

      test('POST /api/login should return auth token', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({
            email: 'test@example.com',
            password: 'password'
          });

        expect(response.statusCode).toBe(200);
        expect(response.body.token).toBeDefined();
      });
    });
