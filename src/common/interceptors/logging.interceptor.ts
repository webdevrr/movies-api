import { CallHandler, ExecutionContext, Injectable, Logger, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const start = Date.now();
    const request: Request = context.switchToHttp().getRequest();
    const correlationId = request.headers['X-Correlation-ID'];
    const handler = context.getHandler().name;
    const { method, url } = request;
    const path = `${method} ${url}`;

    this.logger.log(`Request received`, LoggingInterceptor.name, correlationId, path);

    return next.handle().pipe(
      tap(() => {
        const time = Date.now() - start;
        this.logger.log(
          `Handler ${handler}, execution time: ${time}ms`,
          LoggingInterceptor.name,
          correlationId,
          path
        );
      }),
      tap(() => {
        const response: Response = context.switchToHttp().getResponse();
        const time = Date.now() - start;

        this.logger.log(
          `Request completed: ${response.statusCode} - ${time}ms`,
          LoggingInterceptor.name,
          correlationId,
          path
        );
      })
    );
  }
}
