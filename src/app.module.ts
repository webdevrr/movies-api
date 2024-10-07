import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { HealthController } from './apps/health';
import { EnvModule, envSchema } from './common/env';
import { CustomHttpExceptionFilter, ValidationExceptionFilter } from './common/filters';
import { CorrelationIdInterceptor, LoggingInterceptor } from './common/interceptors';
import { Logger } from './common/logger/logger.service';

@Module({
  controllers: [HealthController],
  imports: [
    ConfigModule.forRoot({
      validate: process.env.NODE_ENV !== 'test' ? env => envSchema.parse(env) : undefined,
      isGlobal: true,
      ignoreEnvFile: process.env.NODE_ENV === 'test'
    }),
    EnvModule
  ],
  providers: [
    Logger,
    {
      provide: APP_INTERCEPTOR,
      useClass: CorrelationIdInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    },
    {
      provide: APP_FILTER,
      useClass: CustomHttpExceptionFilter
    },
    {
      provide: APP_FILTER,
      useClass: ValidationExceptionFilter
    }
  ]
})
export class AppModule {}
