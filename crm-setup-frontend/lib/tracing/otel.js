import { NodeTracerProvider } from '@opentelemetry/sdk-trace-node';
    import { SimpleSpanProcessor } from '@opentelemetry/sdk-trace-base';
    import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
    import { Resource } from '@opentelemetry/resources';
    import { SemanticResourceAttributes } from '@opentelemetry/semantic-conventions';

    const provider = new NodeTracerProvider({
      resource: new Resource({
        [SemanticResourceAttributes.SERVICE_NAME]: 'crm-setup-platform',
        [SemanticResourceAttributes.SERVICE_VERSION]: '1.0.0'
      })
    });

    provider.addSpanProcessor(
      new SimpleSpanProcessor(
        new OTLPTraceExporter({
          url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT
        })
      )
    );

    provider.register();

    export function trace(name, fn) {
      const tracer = provider.getTracer('crm-tracer');
      return tracer.startActiveSpan(name, async (span) => {
        try {
          const result = await fn();
          span.setStatus({ code: 1 }); // OK
          return result;
        } catch (error) {
          span.setStatus({ code: 2, message: error.message }); // ERROR
          throw error;
        } finally {
          span.end();
        }
      });
    }
