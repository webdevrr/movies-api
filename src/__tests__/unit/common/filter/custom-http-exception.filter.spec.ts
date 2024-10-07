import { ArgumentsHost, HttpStatus, Logger } from '@nestjs/common';

import { CustomHttpException } from '@/common/exceptions/http';
import { CustomHttpExceptionFilter } from '@/common/filters';

describe('CustomHttpExceptionFilter', () => {
  let filter: CustomHttpExceptionFilter;
  let logger: Logger;
  let exception: CustomHttpException;

  beforeEach(() => {
    logger = new Logger();
    jest.spyOn(logger, 'error');

    exception = new CustomHttpException('Test Error', 'TEST_ERROR' as any, HttpStatus.BAD_REQUEST);

    filter = new CustomHttpExceptionFilter();
    (filter as any).logger = logger;
  });
  it.only('should catch the exception and log the error', () => {
    const response = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };

    const host = {
      switchToHttp: () => ({
        getResponse: () => response
      })
    } as unknown as ArgumentsHost;

    filter.catch(exception, host);

    expect(logger.error).toHaveBeenCalledWith(exception.message, exception.stack);
    expect(response.status).toHaveBeenCalledWith(exception.httpStatus);
    expect(response.json).toHaveBeenCalledWith({
      statusCode: exception.httpStatus,
      message: exception.message,
      errorCode: exception.errorCode
    });
  });
});
