import prometheus from 'prom-client';

    // Rate limiting metrics
    const rateLimitHits = new prometheus.Counter({
      name: 'rate_limit_hits_total',
      help: 'Total number of rate limit hits',
      labelNames: ['endpoint']
    });

    const rateLimitUsage = new prometheus.Gauge({
      name: 'rate_limit_usage_ratio',
      help: 'Current rate limit usage ratio',
      labelNames: ['endpoint']
    });

    export function trackRateLimitUsage(req, res, next) {
      const endpoint = req.path.split('/')[2] || 'default';
      const usage = req.rateLimit?.current || 0;
      const limit = req.rateLimit?.limit || 1;

      rateLimitUsage.labels(endpoint).set(usage / limit);
      next();
    }

    export { rateLimitHits, rateLimitUsage };
