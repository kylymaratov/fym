"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLogger = void 0;
const common_1 = require("@nestjs/common");
const telegram_bot_1 = require("../bots/telegram.bot");
const server_env_1 = require("./server.env");
let ServerLogger = class ServerLogger extends common_1.ConsoleLogger {
    constructor(telegramBot) {
        super();
        this.telegramBot = telegramBot;
    }
    async error(message, stack, context) {
        try {
            const isProd = server_env_1.serverEnv.isProd ? 'Production' : 'Development';
            const msg = `#Error\n\n${message}\n\nTimestamp: ${new Date().toLocaleString()}\n\n${isProd}`;
            await this.telegramBot.sendLog(msg);
        }
        catch (error) {
            super.error('Failed to send error log to Telegram', error.message);
        }
    }
    async warn(message, stack, context) {
        try {
            const isProd = server_env_1.serverEnv.isProd ? 'Production' : 'Development';
            const msg = `#Warning\n\n${message}\n\nLevel: Warning\nTimestamp: ${new Date().toLocaleString()}\n\n${isProd}`;
            await this.telegramBot.sendLog(msg);
        }
        catch (error) {
            super.warn('Failed to send warning log to Telegram', error.message);
        }
    }
};
exports.ServerLogger = ServerLogger;
exports.ServerLogger = ServerLogger = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(telegram_bot_1.TelegramBot)),
    __metadata("design:paramtypes", [telegram_bot_1.TelegramBot])
], ServerLogger);
//# sourceMappingURL=server.logger.js.map