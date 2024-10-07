import { CallHandler, ExecutionContext } from '@nestjs/common';

import { CorrelationIdInterceptor } from '@/common/interceptors';
import * as utils from '@/utils';

describe('CorrelationIdInterceptor', () => {
  let interceptor: CorrelationIdInterceptor;
  let executionContext: ExecutionContext;
  let callHandler: CallHandler;

  beforeEach(() => {
    interceptor = new CorrelationIdInterceptor();
    executionContext = {
      switchToHttp: jest.fn().mockReturnThis(),
      getClass: jest.fn(),
      getHandler: jest.fn(),
      getArgs: jest.fn(),
      getArgByIndex: jest.fn(),
      switchToRpc: jest.fn(),
      switchToWs: jest.fn(),
      getType: jest.fn()
    };
    executionContext.switchToHttp().getRequest = jest.fn().mockReturnValue({ headers: {} });
    callHandler = { handle: jest.fn() };
  });

  it('should call intercept method', () => {
    interceptor.intercept(executionContext, callHandler);
    expect(executionContext.switchToHttp).toHaveBeenCalled();
  });

  it('should call generateRandomString with correct argument', () => {
    const spy = jest.spyOn(utils, 'generateRandomString');
    interceptor.intercept(executionContext, callHandler);
    expect(spy).toHaveBeenCalledWith(6);
  });

  it('should call getRequest method', () => {
    const getRequestSpy = jest.spyOn(executionContext.switchToHttp(), 'getRequest');
    interceptor.intercept(executionContext, callHandler);
    expect(getRequestSpy).toHaveBeenCalled();
  });

  it('should set X-Correlation-ID header', () => {
    const request = { headers: {} };
    executionContext.switchToHttp().getRequest = jest.fn().mockReturnValue(request);
    interceptor.intercept(executionContext, callHandler);
    expect(request.headers['X-Correlation-ID']).toBeDefined();
  });

  it('should call handle method', () => {
    interceptor.intercept(executionContext, callHandler);
    expect(callHandler.handle).toHaveBeenCalled();
  });
});
