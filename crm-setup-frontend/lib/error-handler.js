export class APIError extends Error {
      constructor(message, status = 500) {
        super(message);
        this.status = status;
      }
    }

    export function errorHandler(error) {
      if (error instanceof APIError) {
        return Response.json(
          { error: error.message },
          { status: error.status }
        );
      }

      if (error instanceof z.ZodError) {
        return Response.json(
          { error: 'Validation failed', details: error.errors },
          { status: 400 }
        );
      }

      console.error(error);
      return Response.json(
        { error: 'Internal server error' },
        { status: 500 }
      );
    }
