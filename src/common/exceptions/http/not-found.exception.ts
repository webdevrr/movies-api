import { HttpStatus } from '@nestjs/common';

import { CustomHttpException } from './custom-http.exception';
import { ErrorCode } from './types';

export class NotFoundException extends CustomHttpException {
  constructor(message: string, errorCode: ErrorCode) {
    super(message, errorCode, HttpStatus.NOT_FOUND);
  }
}
