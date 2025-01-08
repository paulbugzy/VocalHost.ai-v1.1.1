import { z } from 'zod';

    export const registerSchema = z.object({
      name: z.string().min(2),
      email: z.string().email(),
      password: z.string().min(8),
      subdomain: z.string().min(3).regex(/^[a-z0-9-]+$/),
      package: z.enum(['basic', 'pro', 'enterprise'])
    });

    export const loginSchema = z.object({
      email: z.string().email(),
      password: z.string().min(8)
    });

    export const callSchema = z.object({
      phoneNumber: z.string().regex(/^\+[1-9]\d{1,14}$/)
    });

    export const orderSchema = z.object({
      items: z.array(z.object({
        id: z.string(),
        quantity: z.number().min(1),
        price: z.number().min(0)
      })),
      totalAmount: z.number().min(0)
    });
