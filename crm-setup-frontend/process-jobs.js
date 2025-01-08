import { processJobs } from './lib/queue';

    processJobs().catch(err => {
      console.error('Job processing failed:', err);
      process.exit(1);
    });
