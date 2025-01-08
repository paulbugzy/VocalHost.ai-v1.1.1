import { Client } from '@elastic/elasticsearch';
    import { metrics } from '../lib/monitoring';
    import logger from '../lib/logger';

    const esClient = new Client({ node: process.env.ELASTICSEARCH_URL });

    async function checkDeploymentHealth() {
      try {
        // Check Kubernetes deployment status
        const deploymentStatus = await esClient.search({
          index: 'k8s-deployment-logs',
          body: {
            query: {
              match: { 'deployment.name': 'crm-platform' }
            },
            sort: [{ '@timestamp': 'desc' }],
            size: 1
          }
        });

        const latestStatus = deploymentStatus.body.hits.hits[0]?._source.status;
        
        if (latestStatus !== 'Healthy') {
          logger.warn('Deployment is unhealthy, initiating rollback...');
          metrics.rollbackCount.inc();
          await performRollback();
        }
      } catch (error) {
        logger.error('Error checking deployment health:', error);
        metrics.healthCheckErrors.inc();
      }
    }

    async function performRollback() {
      try {
        // Get previous stable version
        const rollbackResponse = await esClient.search({
          index: 'deployment-versions',
          body: {
            query: {
              bool: {
                must: [
                  { match: { status: 'stable' } },
                  { range: { '@timestamp': { lte: 'now-1h' } } }
                ]
              }
            },
            sort: [{ '@timestamp': 'desc' }],
            size: 1
          }
        });

        const previousVersion = rollbackResponse.body.hits.hits[0]?._source.version;
        
        if (previousVersion) {
          // Execute rollback
          logger.info(`Rolling back to version: ${previousVersion}`);
          // Add actual rollback logic here
          metrics.rollbackSuccess.inc();
        } else {
          logger.error('No stable version found for rollback');
          metrics.rollbackFailure.inc();
        }
      } catch (error) {
        logger.error('Rollback failed:', error);
        metrics.rollbackFailure.inc();
      }
    }

    // Run health checks every 5 minutes
    setInterval(checkDeploymentHealth, 5 * 60 * 1000);
