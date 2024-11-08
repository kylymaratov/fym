import { Injectable } from '@nestjs/common';
import { serverEnv } from './server/server.env';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getBackUpInfo() {
    return {
      BOT_TOKEN: serverEnv.env.BOT_TOKEN,
      CHAT_ID: serverEnv.env.CHAT_ID,
    };
  }
}
