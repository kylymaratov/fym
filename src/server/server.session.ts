import { INestApplication } from '@nestjs/common';
import * as session from 'express-session';
import * as pgSession from 'connect-pg-simple';
import * as pg from 'pg';
import { serverEnv } from './server.env';

export const setServerSession = (app: INestApplication) => {
  const pgPool = new pg.Pool({
    connectionString: serverEnv.dbUrl,
  });
  const PgSession = pgSession(session);

  app.use(
    session({
      store: new PgSession({
        pool: pgPool,
        tableName: 'sessions',
        createTableIfMissing: true,
        ttl: 30 * 24 * 60 * 60,
      }),
      secret: process.env.SERCRET_KEY,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        secure: serverEnv.isProd,
      },
    }),
  );
};
