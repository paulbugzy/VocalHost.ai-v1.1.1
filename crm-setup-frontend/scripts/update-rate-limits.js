import fs from 'fs';
    import redisClient from '../lib/redis';

    async function updateRateLimits() {
      // Read current configuration
      const config = JSON.parse(fs.readFileSync('./config/rate-limits.json'));

      // Update Redis with new limits
      for (const [endpoint, settings] of Object.entries(config)) {
        await redisClient.hset(
          'rate_limit_config',
          endpoint,
          JSON.stringify(settings)
        );
      }

      console.log('Rate limits updated successfully');
    }

    updateRateLimits().catch(console.error);
