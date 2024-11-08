import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setServerDocumentaion = (app: INestApplication) => {
  const config = new DocumentBuilder()
    .setTitle('Songfiy API')
    .setDescription('Music streaming service, for free and without borders')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);
};
