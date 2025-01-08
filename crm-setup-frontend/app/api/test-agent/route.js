import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import twilio from 'twilio';
    import { getToken } from '../../lib/auth';

    export async function POST(request) {
      const { phoneNumber } = await request.json();
      const token = await getToken(request);
      
      if (!token) {
        return Response.json({ error: 'Unauthorized' }, { status: 401 });
      }

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database
      });

      // Get user's AI agent configuration
      const config = await db.get(
        `SELECT * FROM ai_configurations WHERE user_id = ?`,
        token.userId
      );

      if (!config) {
        return Response.json({ error: 'AI configuration not found' }, { status: 404 });
      }

      // Initialize Twilio client
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );

      try {
        // Make test call
        const call = await client.calls.create({
          twiml: `
            <Response>
              <Say voice="${config.voice}">
                ${config.greeting}
              </Say>
              <Gather numDigits="1" action="/api/handle-call-input">
                ${config.menu}
              </Gather>
            </Response>
          `,
          to: phoneNumber,
          from: process.env.TWILIO_PHONE_NUMBER
        });

        return Response.json({ 
          success: true, 
          callSid: call.sid 
        });
      } catch (error) {
        return Response.json({ error: error.message }, { status: 500 });
      }
    }
