import { INestApplication } from '@nestjs/common';
import { serverEnv } from './server.env';

const hosts = ['http://localhost:5173'];

const prosHosts = ['http://localhost:3000'];

export const setServerCors = (app: INestApplication) => {
  app.enableCors({
    origin: serverEnv.isProd ? prosHosts : hosts,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    credentials: true,
  });
};
