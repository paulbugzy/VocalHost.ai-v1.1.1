import { open } from 'sqlite';
    import sqlite3 from 'sqlite3';
    import { orderSchema } from '../../lib/validation';
    import { errorHandler } from '../../lib/error-handler';
    import { getToken } from '../../lib/auth';
    import { publishUpdate } from '../../lib/socket';

    export async function POST(request) {
      try {
        const token = await getToken(request);
        if (!token) {
          throw new APIError('Unauthorized', 401);
        }

        const body = await request.json();
        const data = orderSchema.parse(body);

        const db = await open({
          filename: './crm.db',
          driver: sqlite3.Database
        });

        // Get Clover credentials
        const clover = await db.get(
          `SELECT * FROM clover_integrations 
          WHERE user_id = ?`,
          token.userId
        );

        if (!clover) {
          throw new APIError('Clover integration not configured', 400);
        }

        // Create order
        const orderResponse = await fetch(
          `https://api.clover.com/v3/merchants/${clover.merchant_id}/orders`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${clover.access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              items: data.items,
              total: data.totalAmount
            })
          }
        );

        if (!orderResponse.ok) {
          throw new APIError('Failed to create order', orderResponse.status);
        }

        const orderData = await orderResponse.json();

        // Publish order update
        await publishUpdate(`user:${token.userId}`, 'orderUpdate', {
          message: `Order ${orderData.id} created`,
          timestamp: new Date().toISOString()
        });

        // Process payment
        const paymentResponse = await fetch(
          `https://api.clover.com/v3/merchants/${clover.merchant_id}/payments`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${clover.access_token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              orderId: orderData.id,
              amount: data.totalAmount
            })
          }
        );

        if (!paymentResponse.ok) {
          throw new APIError('Payment processing failed', paymentResponse.status);
        }

        const paymentData = await paymentResponse.json();

        // Publish payment update
        await publishUpdate(`user:${token.userId}`, 'paymentUpdate', {
          message: `Payment processed for order ${orderData.id}`,
          timestamp: new Date().toISOString()
        });

        // Save order to database
        await db.run(
          `INSERT INTO orders 
          (user_id, order_id, status, amount)
          VALUES (?, ?, ?, ?)`,
          [token.userId, orderData.id, 'completed', data.totalAmount]
        );

        return Response.json({
          success: true,
          order: orderData,
          payment: paymentData
        });
      } catch (error) {
        return errorHandler(error);
      }
    }
