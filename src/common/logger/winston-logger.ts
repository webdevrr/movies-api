import { createLogger, format, transports } from 'winston';

export const winstonLogger = createLogger({
  level: 'info',
  format: format.combine(
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss'
    }),
    format.json(),
    format.colorize({ all: true })
  ),
  transports: [new transports.Console()]
});
