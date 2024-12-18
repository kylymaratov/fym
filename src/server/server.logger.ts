import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { TelegramBot } from 'src/bots/telegram.bot';
import { serverEnv } from './server.env';

@Injectable()
export class ServerLogger extends ConsoleLogger {
  constructor(@Inject(TelegramBot) private readonly telegramBot: TelegramBot) {
    super();
  }

  async error(message: any, stack?: string, context?: string) {
    try {
      const isProd = serverEnv.isProd ? 'Production' : 'Development';
      const msg = `#Error\n\n${message}\n\nTimestamp: ${new Date().toLocaleString()}\n\n${isProd}`;
      await this.telegramBot.sendLog(msg);
    } catch (error) {
      super.error('Failed to send error log to Telegram', error.message);
    }
  }

  async warn(message: any, stack?: string, context?: string) {
    try {
      const isProd = serverEnv.isProd ? 'Production' : 'Development';
      const msg = `#Warning\n\n${message}\n\nLevel: Warning\nTimestamp: ${new Date().toLocaleString()}\n\n${isProd}`;
      await this.telegramBot.sendLog(msg);
    } catch (error) {
      super.warn('Failed to send warning log to Telegram', error.message);
    }
  }
}
