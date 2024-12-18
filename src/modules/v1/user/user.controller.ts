import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { serverEnv } from 'src/server/server.env';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/guards/jwt.auth.guard';
import { Request } from 'express';

@UseGuards(JwtAuthGuard)
@Controller(`/api/${serverEnv.sv}/user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@Req() req: Request, @CurrentUser() user: UserEntity) {
    return this.userService.getMe(user);
  }

  @Get('sessions')
  getUserSessions(@CurrentUser() user: UserEntity) {
    return this.userService.getUserSessions(user);
  }
}
