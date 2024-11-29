import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class HttpExceptionFilter implements ExceptionFilter {
    private logger;
    private warning_status_codes;
    private ignone_status_codes;
    catch(exception: HttpException, host: ArgumentsHost): void;
}
