import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import { useContainer } from 'class-validator';
import { config } from 'dotenv';

config();

import { name, version } from '../package.json';
import { AppModule } from './app.module';
import { LoggerInterceptor } from './logger/logger.interceptor';
import { ConfigurationService } from './modules/configurations/configuration.service';
import { API_VERSION } from './modules/utils/constants';

const configurationService = new ConfigurationService();

export async function createApp(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.use(bodyParser.json({ limit: '100mb' }));
  app.use(bodyParser.urlencoded({ limit: '100mb', extended: true }));
  setupBaseConfigurations(app);
  setupSwagger(app);

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  return app;
}

async function bootstrap(): Promise<void> {
  const app = await createApp();
  await app.listen(configurationService.get('SERVICE_PORT'));
}

function setupSwagger(app: INestApplication): void {
  const swaggerOptions = new DocumentBuilder()
    .setTitle(`${name} API`)
    .setDescription(`Documentation for ${name} API`)
    .setVersion(version)
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);

  SwaggerModule.setup('/documentation', app, document);
}

function setupBaseConfigurations(app: INestApplication): void {
  const validationPipeOptions = {
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    forbidUnknownValues: true,
  };
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.setGlobalPrefix(API_VERSION);
  app.useGlobalInterceptors(new LoggerInterceptor());
}

bootstrap();
