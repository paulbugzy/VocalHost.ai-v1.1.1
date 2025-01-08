import { CircuitBreaker } from 'opossum';
    import { logChaosEvent } from './chaos-logger';
    import { metrics } from './monitoring';

    export function createResilientCircuit(fn, options = {}) {
      const breaker = new CircuitBreaker(fn, {
        timeout: 3000,
        errorThresholdPercentage: 50,
        resetTimeout: 30000,
        rollingCountTimeout: 60000,
        rollingCountBuckets: 10,
        ...options
      });

      // Chaos-aware circuit breaker
      breaker.on('open', () => {
        logChaosEvent({
          type: 'circuit-breaker',
          status: 'open',
          service: options.name
        });
        metrics.circuitBreakerState.labels(options.name).set(1);
      });

      breaker.on('halfOpen', () => {
        logChaosEvent({
          type: 'circuit-breaker',
          status: 'half-open',
          service: options.name
        });
        metrics.circuitBreakerState.labels(options.name).set(0.5);
      });

      breaker.on('close', () => {
        logChaosEvent({
          type: 'circuit-breaker',
          status: 'closed',
          service: options.name
        });
        metrics.circuitBreakerState.labels(options.name).set(0);
      });

      breaker.on('failure', (error) => {
        logChaosEvent({
          type: 'circuit-breaker',
          status: 'failure',
          service: options.name,
          error: error.message
        });
      });

      return breaker;
    }

    export function withChaosRecovery(fn) {
      return async (...args) => {
        try {
          return await fn(...args);
        } catch (error) {
          logChaosEvent({
            type: 'recovery',
            status: 'failed',
            error: error.message
          });
          
          // Implement fallback strategy
          if (error.isCircuitBreakerOpen) {
            return { status: 'fallback', data: null };
          }

          throw error;
        }
      };
    }
