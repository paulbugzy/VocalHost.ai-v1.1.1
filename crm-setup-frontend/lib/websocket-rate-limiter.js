import { RateLimiterMemory } from 'rate-limiter-flexible';

    const wsRateLimiter = new RateLimiterMemory({
      points: 10, // 10 connections
      duration: 60, // Per minute
    });

    export async function limitWebSocket(ip) {
      try {
        await wsRateLimiter.consume(ip);
        return true;
      } catch (error) {
        return false;
      }
    }
