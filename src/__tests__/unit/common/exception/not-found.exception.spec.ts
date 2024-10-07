import { HttpStatus } from '@nestjs/common';

import { ErrorCode, NotFoundException } from '@/common/exceptions/http';

describe('NotFoundException', () => {
  it('should be defined', () => {
    expect(new NotFoundException('Not found', ErrorCode.NOT_FOUND)).toBeDefined();
  });

  it('should correctly set the message and error code', () => {
    const exception = new NotFoundException('Not found', ErrorCode.NOT_FOUND);
    expect(exception.message).toEqual('Not found');
    expect(exception.errorCode).toEqual(ErrorCode.NOT_FOUND);
  });

  it('should correctly set the HTTP status to NOT_FOUND', () => {
    const exception = new NotFoundException('Not found', ErrorCode.NOT_FOUND);
    expect(exception.httpStatus).toEqual(HttpStatus.NOT_FOUND);
  });
});
