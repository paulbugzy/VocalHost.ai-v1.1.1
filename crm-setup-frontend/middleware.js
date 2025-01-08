import { NextResponse } from 'next/server';
    import { rateLimit } from './lib/rate-limiter';
    import morganMiddleware from './lib/morgan';
    import { v4 as uuidv4 } from 'uuid';
    import { httpRequestDurationMicroseconds } from './lib/monitoring';
    import helmet from 'helmet';
    import { logAuditEvent } from './lib/audit-logger';

    const helmetMiddleware = helmet({
      // ... existing helmet config
    });

    export async function middleware(request) {
      const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
      const requestId = uuidv4();
      const start = Date.now();

      // Add security headers
      const response = NextResponse.next();
      helmetMiddleware(request, response, () => {});

      // Add request ID to headers
      response.headers.set('X-Request-ID', requestId);
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-XSS-Protection', '1; mode=block');

      // Log request
      morganMiddleware(request, response, () => {});

      try {
        // Apply rate limiting
        if (request.nextUrl.pathname.startsWith('/api')) {
          await rateLimit('api', ip);
        }

        if (request.nextUrl.pathname.startsWith('/api/auth')) {
          await rateLimit('auth', ip);
        }

        // Record metrics
        const duration = (Date.now() - start) / 1000;
        httpRequestDurationMicroseconds
          .labels(request.method, request.nextUrl.pathname, response.status)
          .observe(duration);

        // Log audit event
        await logAuditEvent({
          userId: request.headers.get('x-user-id') || 'anonymous',
          action: request.method + ' ' + request.nextUrl.pathname,
          details: {
            headers: Object.fromEntries(request.headers),
            query: Object.fromEntries(request.nextUrl.searchParams)
          },
          ip,
          userAgent: request.headers.get('user-agent')
        });

        return response;
      } catch (error) {
        return new Response(error.message, { status: 429 });
      }
    }

    export const config = {
      matcher: [
        '/api/:path*',
        '/dashboard/:path*'
      ]
    };
