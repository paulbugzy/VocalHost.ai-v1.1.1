import rateLimit from 'express-rate-limit';
    import RedisStore from 'rate-limit-redis';
    import redisClient from './redis';
    import rateLimits from '../config/rate-limits.json';
    import { metrics } from './monitoring';

    const keyGenerators = {
      ip: (req) => req.ip,
      'ip+user': (req) => `${req.ip}:${req.user?.id || 'anonymous'}`,
      'ip+apiKey': (req) => `${req.ip}:${req.headers['x-api-key']}`
    };

    export function createRateLimiter(configName, customConfig = {}) {
      const config = {
        ...rateLimits.default,
        ...(rateLimits[configName] || {}),
        ...customConfig
      };

      return rateLimit({
        store: new RedisStore({
          client: redisClient,
          prefix: `rate_limit:${configName}:`
        }),
        windowMs: config.windowMs,
        max: config.max,
        message: config.message,
        standardHeaders: true,
        legacyHeaders: false,
        keyGenerator: keyGenerators[config.keyGenerator] || keyGenerators.ip,
        skip: (req) => {
          if (config.skip?.includes(req.ip)) return true;
          if (config.skip?.includes('internal-service') && 
              req.headers['x-internal-service'] === 'true') return true;
          return false;
        },
        handler: (req, res) => {
          metrics.rateLimitHits.labels(configName).inc();
          res.status(429).json({
            error: config.message || 'Too many requests',
            retryAfter: req.rateLimit.resetTime
          });
        }
      });
    }

    // Pre-configured rate limiters
    export const cloverRateLimiter = createRateLimiter('clover');
    export const twilioRateLimiter = createRateLimiter('twilio');
    export const openaiRateLimiter = createRateLimiter('openai');
    export const featureFlagRateLimiter = createRateLimiter('feature-flags');
