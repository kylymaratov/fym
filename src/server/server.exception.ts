import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ServerLogger } from './server.logger';
import { TelegramBot } from 'src/bots/telegram.bot';
import { ConvertUtil } from 'src/utils/convert.util';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger: ServerLogger = new ServerLogger(
    new TelegramBot(new ConvertUtil()),
  );
  private warning_status_codes = [404];

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errResponse = exception.getResponse();

    if (this.warning_status_codes.includes(status)) {
      this.logger.warn(JSON.stringify(errResponse));
    } else {
      this.logger.error(JSON.stringify(errResponse));
    }

    response.status(status).json({
      timestamp: new Date().toISOString(),
      path: request.url,
      errResponse,
    });
  }
}
