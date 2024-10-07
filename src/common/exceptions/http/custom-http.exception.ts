import { HttpStatus } from '@nestjs/common';

import { ErrorCode } from './types';

export class CustomHttpException extends Error {
  public errorCode: ErrorCode;
  public httpStatus: HttpStatus;

  constructor(message: string, errorCode: ErrorCode, httpStatus: HttpStatus) {
    super(message);
    this.errorCode = errorCode;
    this.httpStatus = httpStatus;
  }
}
