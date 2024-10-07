import { ArgumentsHost, BadRequestException, Catch, ExceptionFilter, Logger } from '@nestjs/common';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter<BadRequestException> {
  private readonly logger = new Logger(ValidationExceptionFilter.name);

  catch(error: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    this.logger.error(error.message, error.stack);
    response.status(error.getStatus()).json(error.getResponse());
  }
}
