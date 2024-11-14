import { ConsoleLogger, Inject, Injectable } from '@nestjs/common';
import { TelegramBot } from 'src/bots/telegram.bot';

@Injectable()
export class ServerLogger extends ConsoleLogger {
  constructor(
    @Inject(TelegramBot) private readonly telegramBot: TelegramBot, // Injecting the TelegramBot
  ) {
    super();
  }

  async error(message: any, stack?: string, context?: string) {
    super.error(message, stack, context);
    try {
      await this.telegramBot.sendLog(message, 'error');
    } catch (error) {
      super.error('Failed to send error log to Telegram', error.message);
    }
  }

  async warn(message: any, stack?: string, context?: string) {
    super.warn(message, stack, context);
    try {
      await this.telegramBot.sendLog(message, 'warning');
    } catch (error) {
      super.warn('Failed to send warning log to Telegram', error.message);
    }
  }
}
