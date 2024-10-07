import { HttpStatus } from '@nestjs/common';

import { CustomHttpException, ErrorCode } from '@/common/exceptions/http';

describe('CustomHttpException', () => {
  it('should correctly set the message property', () => {
    const exception = new CustomHttpException(
      'Test message',
      'Test code' as ErrorCode,
      HttpStatus.BAD_REQUEST
    );
    expect(exception.message).toBe('Test message');
  });

  it('should correctly set the errorCode property', () => {
    const exception = new CustomHttpException(
      'Test message',
      'Test code' as ErrorCode,
      HttpStatus.BAD_REQUEST
    );
    expect(exception.errorCode).toBe('Test code');
  });

  it('should correctly set the httpStatus property', () => {
    const exception = new CustomHttpException(
      'Test message',
      'Test code' as ErrorCode,
      HttpStatus.BAD_REQUEST
    );
    expect(exception.httpStatus).toBe(HttpStatus.BAD_REQUEST);
  });
});
