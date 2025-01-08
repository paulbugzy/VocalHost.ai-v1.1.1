import { NextResponse } from 'next/server';
    import { initSocket } from '../../lib/socket';

    export async function GET() {
      const server = await initSocket();
      return NextResponse.json({ success: true });
    }
