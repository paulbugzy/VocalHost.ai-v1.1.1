import twilio from 'twilio';

    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

    export default async function handler(req, res) {
      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
      }

      const { phoneNumber } = req.body;

      if (!phoneNumber) {
        return res.status(400).json({ message: 'Phone number is required' });
      }

      try {
        await client.calls.create({
          to: phoneNumber,
          from: process.env.TWILIO_PHONE_NUMBER,
          url: `${process.env.BASE_URL}/twiml`,
        });

        res.status(200).json({ message: 'Call initiated successfully!' });
      } catch (error) {
        console.error('Error initiating call:', error);
        res.status(500).json({ message: 'Failed to initiate call', error: error.message });
      }
    }
