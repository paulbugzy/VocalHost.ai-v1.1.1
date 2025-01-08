import { serveSwaggerUI } from 'next-swagger-doc';

    export async function GET() {
      return serveSwaggerUI({
        title: 'CRM Setup Platform API',
        version: '1.0.0',
        description: 'API documentation for the CRM Setup Platform',
        apiUrl: '/api/docs'
      });
    }
