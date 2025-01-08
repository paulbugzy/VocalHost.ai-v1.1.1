import { Queue } from 'bull';
    import redisClient from './redis';
    import logger from './logger';

    const queue = new Queue('background-tasks', {
      redis: redisClient.options.url,
      defaultJobOptions: {
        removeOnComplete: true,
        attempts: 3,
        backoff: {
          type: 'exponential',
          delay: 1000
        }
      }
    });

    queue.on('failed', (job, error) => {
      logger.error(`Job ${job.id} failed: ${error.message}`);
    });

    queue.on('completed', (job) => {
      logger.info(`Job ${job.id} completed`);
    });

    export async function addJob(name, data) {
      return queue.add(name, data);
    }

    export async function processJobs() {
      queue.process('send-email', async (job) => {
        // Email sending logic
      });

      queue.process('process-payment', async (job) => {
        // Payment processing logic
      });

      queue.process('cleanup', async (job) => {
        // Cleanup tasks
      });
    }
