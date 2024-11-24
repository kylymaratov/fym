import { INestApplication } from '@nestjs/common';

const hosts = ['http://localhost:3000'];

export const setServerCors = (app: INestApplication) => {
  app.enableCors({
    origin: hosts,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
};
