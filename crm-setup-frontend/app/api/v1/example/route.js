import { withTrace, getTraceContext } from '../../../lib/tracing';

    export const GET = withTrace(async (request) => {
      const trace = getTraceContext();
      return Response.json({
        message: 'Example API endpoint',
        traceId: trace?.traceId
      });
    });
