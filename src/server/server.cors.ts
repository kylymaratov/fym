import { INestApplication } from '@nestjs/common';
import { serverEnv } from './server.env';

const hosts = serverEnv.isProd ? ['/'] : ['http://localhost:5174'];

export const setServerCors = (app: INestApplication) => {
  app.enableCors({
    origin: hosts,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
};
