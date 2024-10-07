import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('health')
@Controller('/')
export class HealthController {
  constructor() {}

  @Get('')
  health() {
    return 'Hello from Movies API!';
  }
}
