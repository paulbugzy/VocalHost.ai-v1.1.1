import swaggerUi from 'swagger-ui-express';
    import { createSwaggerSpec } from 'next-swagger-doc';

    export async function GET() {
      const spec = createSwaggerSpec({
        definition: {
          openapi: '3.0.0',
          info: {
            title: 'CRM Setup Platform API',
            version: '1.0.0',
          },
          components: {
            securitySchemes: {
              BearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
              }
            }
          },
          security: [{
            BearerAuth: []
          }]
        },
        apiFolder: 'app/api'
      });

      return Response.json(spec);
    }
