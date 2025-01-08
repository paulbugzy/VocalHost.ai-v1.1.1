import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import bcrypt from 'bcrypt';

    export default async function handler(req, res) {
      if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method not allowed' });
      }

      const {
        fullName,
        email,
        password,
        businessName,
        phone,
        address,
        plan,
        subdomain,
      } = req.body;

      if (!email || !password || !subdomain) {
        return res.status(400).json({ message: 'Required fields are missing' });
      }

      const db = await open({
        filename: './crm.db',
        driver: sqlite3.Database,
      });

      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to database
        await db.run(
          `INSERT INTO users (fullName, email, password, businessName, phone, address, plan, subdomain)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
          [fullName, email, hashedPassword, businessName, phone, address, plan, subdomain]
        );

        res.status(201).json({ message: 'Registration successful' });
      } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Failed to register user' });
      }
    }
