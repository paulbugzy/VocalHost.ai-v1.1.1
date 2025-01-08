import { Scenario, test } from 'artillery';
    import { expect } from 'chai';

    const baseUrl = process.env.BASE_URL || 'http://localhost:3007';

    test('API Availability Test', async ({ page }) => {
      const scenario = new Scenario('API Availability Test');

      // Test health endpoint
      await scenario.get('/api/v1/health')
        .expect('status', 200)
        .expect('response.body.status', 'healthy');

      // Run the scenario
      const results = await scenario.run();

      // Assert availability metrics
      expect(results.metrics.http.codes['200']).to.be.above(0.95);
      expect(results.metrics.http.errors).to.equal(0);
    });
