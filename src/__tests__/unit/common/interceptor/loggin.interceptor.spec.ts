import { CallHandler, ExecutionContext, Logger } from '@nestjs/common';
import { of } from 'rxjs';

import { LoggingInterceptor } from '@/common/interceptors/logging.interceptor';

describe('LoggingInterceptor', () => {
  let loggingInterceptor: LoggingInterceptor;
  let mockCallHandler: CallHandler;
  let mockExecutionContext: ExecutionContext;
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger();
    jest.spyOn(logger, 'log');

    loggingInterceptor = new LoggingInterceptor();
    (loggingInterceptor as any).logger = logger;

    mockCallHandler = {
      handle: jest.fn().mockReturnValue(of('test'))
    };
    mockExecutionContext = {
      getClass: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn(),
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue({
          headers: { 'X-Correlation-ID': '123' },
          method: 'GET',
          url: '/test'
        }),
        getResponse: jest.fn().mockReturnValue({ statusCode: 200 })
      }),
      getHandler: jest.fn().mockReturnValue({ name: 'testHandler' })
    };
  });

  it('should be defined', () => {
    expect(loggingInterceptor).toBeDefined();
  });

  it('should log the correct messages', () => {
    loggingInterceptor.intercept(mockExecutionContext, mockCallHandler).subscribe();

    expect(logger.log).toHaveBeenCalledWith(
      'Request received',
      'LoggingInterceptor',
      '123',
      'GET /test'
    );
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringContaining('Handler testHandler, execution time:'),
      'LoggingInterceptor',
      '123',
      'GET /test'
    );
    expect(logger.log).toHaveBeenCalledWith(
      expect.stringContaining('Request completed: 200 -'),
      'LoggingInterceptor',
      '123',
      'GET /test'
    );
  });
});
