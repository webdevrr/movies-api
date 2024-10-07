import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';

import { generateRandomString } from '@/utils';

@Injectable()
export class CorrelationIdInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const correlationId = generateRandomString(6);

    const request = context.switchToHttp().getRequest();
    request.headers['X-Correlation-ID'] = correlationId;

    return next.handle();
  }
}
