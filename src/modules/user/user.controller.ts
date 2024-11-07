import { Controller, Get, UseGuards } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { CurrentUser } from 'src/decorators/user.decorator';
import { ApiAuthGuard } from 'src/guards/api.auth.guard';
import { serverEnv } from 'src/server/server.env';
import { UserService } from './user.service';

@UseGuards(ApiAuthGuard)
@Controller(`/api/${serverEnv.sv}/user`)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('me')
  getMe(@CurrentUser() user: UserEntity) {
    return this.userService.getMe(user);
  }

  @Get('/song/liked')
  getLikedSongs(@CurrentUser() user: UserEntity) {
    return this.userService.getLikedSongs(user);
  }

  @Get('/song/baseonlikes')
  getRandomSongsBaseOnLikes(@CurrentUser() user: UserEntity) {
    return this.userService.getRandomSongsBaseOnLikes(user);
  }
}
