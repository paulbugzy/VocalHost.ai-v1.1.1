const { trace } = require('./lib/tracing/otel');
    const { isFeatureEnabled } = require('./lib/feature-flags');

    module.exports = {
      async headers() {
        return [
          {
            source: '/:path*',
            headers: [
              { key: 'X-Content-Type-Options', value: 'nosniff' },
              { key: 'X-Frame-Options', value: 'DENY' },
              { key: 'X-XSS-Protection', value: '1; mode=block' },
              { key: 'Referrer-Policy', value: 'same-origin' },
              { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' }
            ]
          }
        ];
      },
      async rewrites() {
        const rewrites = [];

        if (isFeatureEnabled('canary-deployment')) {
          rewrites.push({
            source: '/canary/:path*',
            destination: 'https://canary.example.com/:path*'
          });
        }

        if (isFeatureEnabled('new-api-version')) {
          rewrites.push({
            source: '/api/v2/:path*',
            destination: '/api/:path*'
          });
        }

        return rewrites;
      },
      experimental: {
        canary: {
          enabled: isFeatureEnabled('canary-deployment'),
          percentage: 10 // 10% of traffic
        }
      }
    };
