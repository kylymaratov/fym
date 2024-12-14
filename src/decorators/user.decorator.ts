import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user/user.entity';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.user as UserEntity;
  },
);
