export async function GET() {
      const authUrl = new URL('https://www.clover.com/oauth/authorize');
      authUrl.searchParams.append('client_id', process.env.CLOVER_CLIENT_ID);
      authUrl.searchParams.append('redirect_uri', process.env.CLOVER_REDIRECT_URI);
      authUrl.searchParams.append('response_type', 'code');

      return Response.redirect(authUrl.toString());
    }
