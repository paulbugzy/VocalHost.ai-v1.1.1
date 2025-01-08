import { Server } from 'socket.io';
    import redisClient from './redis';
    import { limitWebSocket } from './websocket-rate-limiter';
    import logger from './logger';

    let io;

    export function initSocket(server) {
      io = new Server(server, {
        cors: {
          origin: process.env.NEXT_PUBLIC_CLIENT_URL,
          methods: ['GET', 'POST']
        },
        connectionStateRecovery: {
          maxDisconnectionDuration: 2 * 60 * 1000, // 2 minutes
          skipMiddlewares: true
        }
      });

      io.use(async (socket, next) => {
        const ip = socket.handshake.address;
        const allowed = await limitWebSocket(ip);

        if (!allowed) {
          logger.warn(`WebSocket rate limit exceeded for IP: ${ip}`);
          return next(new Error('Too many connections'));
        }

        next();
      });

      io.on('connection', (socket) => {
        logger.info(`Client connected: ${socket.id}`);

        socket.on('subscribe', async (userId) => {
          const channel = `user:${userId}`;
          await socket.join(channel);
          logger.info(`Socket ${socket.id} subscribed to ${channel}`);
        });

        socket.on('disconnect', () => {
          logger.info(`Client disconnected: ${socket.id}`);
        });
      });

      return io;
    }

    // ... rest of the socket.js code remains the same
