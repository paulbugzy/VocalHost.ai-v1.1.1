import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import twilio from 'twilio';

    export async function POST(request) {
      const formData = await request.formData();
      const digits = formData.get('Digits');
      const callSid = formData.get('CallSid');

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database
      });

      // Get call details
      const call = await db.get(
        'SELECT * FROM calls WHERE call_sid = ?',
        callSid
      );

      if (!call) {
        return new Response(`
          <Response>
            <Say>Error: Call not found</Say>
            <Hangup/>
          </Response>
        `, {
          headers: { 'Content-Type': 'text/xml' }
        });
      }

      // Process input
      const response = new twilio.twiml.VoiceResponse();
      response.say({ voice: call.voice }, `You pressed ${digits}`);
      response.hangup();

      return new Response(response.toString(), {
        headers: { 'Content-Type': 'text/xml' }
      });
    }
