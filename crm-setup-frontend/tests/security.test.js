import request from 'supertest';
    import app from '../app';
    import { expect } from 'chai';

    describe('Security Tests', () => {
      test('Should prevent XSS attacks', async () => {
        const response = await request(app)
          .get('/api/v1/test?q=<script>alert(1)</script>')
          .set('Accept', 'application/json');

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Invalid input');
      });

      test('Should prevent SQL injection', async () => {
        const response = await request(app)
          .post('/api/login')
          .send({
            email: "admin' --",
            password: 'password'
          });

        expect(response.status).to.equal(400);
        expect(response.body.error).to.equal('Invalid credentials');
      });

      test('Should enforce HTTPS', async () => {
        const response = await request(app)
          .get('/api/v1/health')
          .set('X-Forwarded-Proto', 'http');

        expect(response.status).to.equal(301);
        expect(response.headers.location).to.match(/^https:\/\//);
      });
    });
