import { isFeatureEnabled, getFeatureVariant } from '../../lib/feature-flags';

    export async function GET(request) {
      const { searchParams } = new URL(request.url);
      const featureName = searchParams.get('feature');
      const userId = searchParams.get('userId');

      if (!featureName) {
        return Response.json(
          { error: 'Feature name is required' },
          { status: 400 }
        );
      }

      const context = {
        userId: userId || 'anonymous',
        environment: process.env.NODE_ENV || 'development'
      };

      return Response.json({
        feature: featureName,
        enabled: isFeatureEnabled(featureName, context),
        variant: getFeatureVariant(featureName, context)
      });
    }
