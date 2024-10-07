import { ArgumentsHost, Catch, ExceptionFilter, Logger } from '@nestjs/common';

import { CustomHttpException } from '../exceptions/http/custom-http.exception';

@Catch(CustomHttpException)
export class CustomHttpExceptionFilter implements ExceptionFilter<CustomHttpException> {
  private readonly logger = new Logger(CustomHttpExceptionFilter.name);

  catch(error: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    const { httpStatus, message, errorCode } = error;

    this.logger.error(error.message, error.stack);

    const exceptionResponse = {
      statusCode: httpStatus,
      message: message,
      errorCode: errorCode
    };

    return response.status(httpStatus).json(exceptionResponse);
  }
}
