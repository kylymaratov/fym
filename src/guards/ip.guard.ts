import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class IpGuard implements CanActivate {
  private allowedIps: string[] = ['127.0.0.1', 'localhost'];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const ip = request.ip;

    return this.allowedIps.includes(ip);
  }
}
