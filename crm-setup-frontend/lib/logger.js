// Add tracing to existing logger
    import winston from 'winston';
    import { format } from 'logform';
    import { getTraceContext } from './tracing';

    const { combine, timestamp, printf, colorize } = format;

    const customFormat = printf(({ level, message, timestamp }) => {
      const trace = getTraceContext();
      const traceId = trace?.traceId ? ` [trace:${trace.traceId}]` : '';
      return `${timestamp}${traceId} [${level}]: ${message}`;
    });

    const logger = winston.createLogger({
      level: 'info',
      format: combine(
        colorize(),
        timestamp(),
        customFormat
      ),
      transports: [
        new winston.transports.Console(),
        new winston.transports.File({ 
          filename: 'logs/combined.log',
          level: 'info'
        }),
        new winston.transports.File({
          filename: 'logs/error.log',
          level: 'error'
        })
      ]
    });

    export default logger;
