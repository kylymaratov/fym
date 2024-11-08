import { INestApplication } from '@nestjs/common';
import * as passport from 'passport';

export const setServerPassport = (app: INestApplication) => {
  app.use(passport.initialize());
  app.use(passport.session());
};
