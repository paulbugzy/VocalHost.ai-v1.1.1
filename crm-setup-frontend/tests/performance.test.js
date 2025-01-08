import { Scenario, test } from 'artillery';
    import { expect } from 'chai';

    const baseUrl = process.env.BASE_URL || 'http://localhost:3007';

    test('API Performance Test', async ({ page }) => {
      const scenario = new Scenario('API Load Test');

      // Test health endpoint
      await scenario.get('/api/v1/health')
        .expect('status', 200)
        .expect('response.body.status', 'healthy');

      // Test login endpoint
      await scenario.post('/api/login')
        .send({
          email: 'test@example.com',
          password: 'password'
        })
        .expect('status', 200)
        .expect('response.body.token').toBeDefined();

      // Test dashboard endpoint
      await scenario.get('/api/v1/dashboard')
        .set('Authorization', 'Bearer test-token')
        .expect('status', 200);

      // Run the scenario
      const results = await scenario.run();

      // Assert performance metrics
      expect(results.metrics.http.response_time.p95).to.be.below(500);
      expect(results.metrics.http.request_rate).to.be.above(50);
    });
