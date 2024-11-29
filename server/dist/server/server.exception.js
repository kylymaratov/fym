"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExceptionFilter = void 0;
const common_1 = require("@nestjs/common");
const server_logger_1 = require("./server.logger");
const telegram_bot_1 = require("../bots/telegram.bot");
const convert_util_1 = require("../utils/convert.util");
let HttpExceptionFilter = class HttpExceptionFilter {
    constructor() {
        this.logger = new server_logger_1.ServerLogger(new telegram_bot_1.TelegramBot(new convert_util_1.ConvertUtil()));
        this.warning_status_codes = [404];
        this.ignone_status_codes = [403];
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception.getStatus();
        const errResponse = exception.getResponse();
        if (status >= 500) {
            this.logger.error(JSON.stringify(errResponse));
        }
        response.status(status).json({
            timestamp: new Date().toISOString(),
            path: request.url,
            errResponse,
        });
    }
};
exports.HttpExceptionFilter = HttpExceptionFilter;
exports.HttpExceptionFilter = HttpExceptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExceptionFilter);
//# sourceMappingURL=server.exception.js.map