import { cookies } from 'next/headers';
    import jwt from 'jsonwebtoken';

    const SECRET = process.env.JWT_SECRET || 'your-secret-key';

    export async function createToken(userId) {
      return jwt.sign({ userId }, SECRET, { expiresIn: '1h' });
    }

    export async function getToken(request) {
      const cookieStore = cookies();
      const token = cookieStore.get('auth-token')?.value;

      if (!token) return null;

      try {
        return jwt.verify(token, SECRET);
      } catch (error) {
        return null;
      }
    }

    export async function setAuthCookie(token) {
      cookies().set('auth-token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 // 1 hour
      });
    }

    export async function clearAuthCookie() {
      cookies().delete('auth-token');
    }
