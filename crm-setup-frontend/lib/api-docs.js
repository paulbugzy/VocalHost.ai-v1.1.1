// Add OpenAPI 3.1 support and better organization
    import swaggerJSDoc from 'swagger-jsdoc';
    import swaggerUi from 'swagger-ui-express';
    import packageJson from '../package.json';

    const options = {
      definition: {
        openapi: '3.1.0',
        info: {
          title: 'CRM Setup Platform API',
          version: packageJson.version,
          description: 'Comprehensive API documentation',
          license: {
            name: 'MIT',
            url: 'https://opensource.org/licenses/MIT'
          },
          contact: {
            name: 'API Support',
            url: 'https://example.com/support',
            email: 'support@example.com'
          }
        },
        servers: [
          {
            url: '{protocol}://{environment}.example.com',
            variables: {
              protocol: {
                enum: ['http', 'https'],
                default: 'https'
              },
              environment: {
                enum: ['dev', 'staging', 'prod'],
                default: 'prod'
              }
            }
          }
        ],
        components: {
          securitySchemes: {
            BearerAuth: {
              type: 'http',
              scheme: 'bearer',
              bearerFormat: 'JWT'
            },
            ApiKeyAuth: {
              type: 'apiKey',
              in: 'header',
              name: 'X-API-KEY'
            }
          },
          responses: {
            UnauthorizedError: {
              description: 'Access token is missing or invalid'
            },
            NotFoundError: {
              description: 'Resource not found'
            }
          }
        }
      },
      apis: ['./app/api/**/*.js'],
      explorer: true
    };

    const swaggerSpec = swaggerJSDoc(options);

    export function setupApiDocs(app) {
      app.use('/api-docs', 
        swaggerUi.serve, 
        swaggerUi.setup(swaggerSpec, {
          customSiteTitle: 'CRM Platform API Docs',
          customCss: '.swagger-ui .topbar { display: none }',
          customfavIcon: '/public/favicon.ico'
        })
      );
    }
