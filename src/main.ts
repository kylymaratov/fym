import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverEnv } from './server/server.env';
import { setServerCors } from './server/server.cors';
import { setServerSession } from './server/server.session';
import { setServerPassport } from './server/server.passport';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './server/server.exception';
import { setServerDocumentaion } from './server/server.documentation';
import express from "express"

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  const expressApp = app.getHttpAdapter().getInstance() as express.Application;

  expressApp.set('trust proxy', true);

  setServerCors(app);
  setServerSession(app);
  setServerPassport(app);
  setServerDocumentaion(app);

  await app.listen(serverEnv.isProd ? 5000 : 5001);
}
bootstrap();
