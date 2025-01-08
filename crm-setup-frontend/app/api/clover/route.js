import { NextResponse } from 'next/server';
    import { cloverRateLimiter } from '../../lib/rate-limiter';

    export async function POST(request) {
      // Apply rate limiting
      const limited = await cloverRateLimiter(request);
      if (limited) return limited;

      // Your Clover API logic here
      return NextResponse.json({ success: true });
    }
