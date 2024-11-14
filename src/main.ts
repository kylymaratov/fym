import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { serverEnv } from './server/server.env';
import { setServerCors } from './server/server.cors';
import { setServerSession } from './server/server.session';
import { setServerPassport } from './server/server.passport';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './server/server.exception';
import { setServerDocumentaion } from './server/server.documentation';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());

  setServerCors(app);
  setServerSession(app);
  setServerPassport(app);
  setServerDocumentaion(app);

  await app.listen(serverEnv.env.PORT ?? 5000);
}
bootstrap();
