import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Session } from 'express-session';

export const CurrentSession = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.session as Session;
  },
);
