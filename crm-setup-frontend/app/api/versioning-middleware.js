import { NextResponse } from 'next/server';

    export async function middleware(request) {
      const path = request.nextUrl.pathname;

      // Redirect to latest version if no version specified
      if (path.startsWith('/api/') && !path.startsWith('/api/v')) {
        const newUrl = new URL(`/api/v1${path}`, request.url);
        return NextResponse.redirect(newUrl);
      }

      return NextResponse.next();
    }

    export const config = {
      matcher: '/api/:path*'
    };
