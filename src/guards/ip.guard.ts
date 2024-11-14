import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class IpGuard implements CanActivate {
  private allowedIps: string[] = [
    '127.0.0.1',
    '::1',
    'localhost',
    'host.docker.internal',
  ];

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const ip = (request.headers['x-forwarded-for'] as string) || request.ip;

    return this.allowedIps.includes(ip);
  }
}
