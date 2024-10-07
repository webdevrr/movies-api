import { ArgumentsHost, BadRequestException, Logger } from '@nestjs/common';

import { ValidationExceptionFilter } from '@/common/filters/validation-exception.filter';

describe('ValidationExceptionFilter', () => {
  let filter: ValidationExceptionFilter;
  let logger: Logger;
  let exception: BadRequestException;

  beforeEach(() => {
    logger = new Logger();
    jest.spyOn(logger, 'error');

    exception = new BadRequestException('Test Error');

    filter = new ValidationExceptionFilter();
    (filter as any).logger = logger;
  });

  it('should catch the exception and log the error', () => {
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
    expect(response.status).toHaveBeenCalledWith(exception.getStatus());
    expect(response.json).toHaveBeenCalledWith(exception.getResponse());
  });
});
