import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor() {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>() as Request;
    const access_token = request.session.access_token;

    const incoming_token =
      request.cookies && request.cookies['access_token']
        ? request.cookies['access_token'].replace('Bearer', '').trim()
        : '';

    if (access_token !== incoming_token) {
      throw new UnauthorizedException();
    }

    const result = (await super.canActivate(context)) as boolean;

    return result && request.isAuthenticated();
  }
}
