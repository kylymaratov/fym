import { Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class HeaderUtil {
  getIp(request: Request) {
    const forwarded = request.headers['x-forwarded-for'] as string;

    return forwarded ? forwarded.split(',')[0] : request.ip;
  }
}
