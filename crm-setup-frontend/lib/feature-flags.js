import { Unleash } from 'unleash-client-node';
    import logger from './logger';

    const unleash = new Unleash({
      url: process.env.UNLEASH_URL,
      appName: 'crm-setup-platform',
      environment: process.env.NODE_ENV || 'development',
      customHeaders: {
        Authorization: process.env.UNLEASH_API_KEY
      }
    });

    unleash.on('ready', () => {
      logger.info('Feature flags ready');
    });

    unleash.on('error', (error) => {
      logger.error('Feature flags error:', error);
    });

    export function isFeatureEnabled(featureName, context = {}) {
      return unleash.isEnabled(featureName, context);
    }

    export function getFeatureVariant(featureName, context = {}) {
      return unleash.getVariant(featureName, context);
    }
