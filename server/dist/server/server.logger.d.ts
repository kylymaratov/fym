import { ConsoleLogger } from '@nestjs/common';
import { TelegramBot } from 'src/bots/telegram.bot';
export declare class ServerLogger extends ConsoleLogger {
    private readonly telegramBot;
    constructor(telegramBot: TelegramBot);
    error(message: any, stack?: string, context?: string): Promise<void>;
    warn(message: any, stack?: string, context?: string): Promise<void>;
}
