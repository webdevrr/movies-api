import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';

import { AppModule } from './app.module';
import { EnvService } from './common/env';
import { Logger } from './common/logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  const logger = app.get(Logger);

  const config = new DocumentBuilder()
    .setTitle('Nestjs Movies API')
    .setDescription('The Movies API description')
    .setVersion('1.0')
    .build();
  const configService = app.get(EnvService);
  const port = configService.get('PORT') || 3000;

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  logger.log(`Swagger is running on <http://localhost>:${port}/api`, 'Bootstrap');

  await app.listen(port).then(() => logger.log(`Listening on port ${port}`, 'Bootstrap'));
}

bootstrap();
