import {
      cloverRateLimiter,
      twilioRateLimiter,
      openaiRateLimiter,
      featureFlagRateLimiter
    } from '../lib/rate-limiter';

    export function applyRateLimiting(app) {
      // Clover API endpoints
      app.use('/api/clover/*', cloverRateLimiter);

      // Twilio API endpoints
      app.use('/api/twilio/*', twilioRateLimiter);

      // OpenAI API endpoints
      app.use('/api/openai/*', openaiRateLimiter);

      // Feature flag endpoints
      app.use('/api/feature-flags/*', featureFlagRateLimiter);

      // Default rate limiter for all other API endpoints
      app.use('/api/*', createRateLimiter('default'));
    }
