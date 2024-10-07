import { Injectable, LoggerService } from '@nestjs/common';

import { winstonLogger } from './winston-logger';

@Injectable()
export class Logger implements LoggerService {
  log(message: string, context?: string, correlationId?: string, path?: string) {
    winstonLogger.info(message, { context, correlationId, path });
  }

  error(message: string, trace: string, context?: string, correlationId?: string, path?: string) {
    winstonLogger.error(message, { context, trace, correlationId, path });
  }

  warn(message: string, context?: string) {
    winstonLogger.warn(message, { context });
  }

  debug(message: string, context?: string) {
    winstonLogger.debug(message, { context });
  }
}
