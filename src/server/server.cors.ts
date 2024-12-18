import { INestApplication } from '@nestjs/common';
import { serverEnv } from './server.env';

const hosts = ['http://localhost:5173'];

export const setServerCors = (app: INestApplication) => {
  app.enableCors({
    origin: serverEnv.isProd ? "/" : hosts,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
};
