import { AsyncLocalStorage } from 'async_hooks';
    import logger from './logger';

    const asyncLocalStorage = new AsyncLocalStorage();

    export function withTrace(fn) {
      return async (...args) => {
        const store = new Map();
        store.set('traceId', uuidv4());
        store.set('startTime', Date.now());

        return asyncLocalStorage.run(store, async () => {
          try {
            const result = await fn(...args);
            logger.info({
              message: 'Request completed',
              traceId: store.get('traceId'),
              duration: Date.now() - store.get('startTime')
            });
            return result;
          } catch (error) {
            logger.error({
              message: 'Request failed',
              traceId: store.get('traceId'),
              error: error.message,
              stack: error.stack
            });
            throw error;
          }
        });
      };
    }

    export function getTraceContext() {
      const store = asyncLocalStorage.getStore();
      return store ? Object.fromEntries(store) : null;
    }
