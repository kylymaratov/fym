import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserDatabaseService } from './services/database.service';
import { SongDatabaseService } from '../song/services/database.service';

@Injectable()
export class UserService {
  constructor(
    @Inject() private userDatabaseService: UserDatabaseService,
    @Inject() private songDatabaseService: SongDatabaseService,
  ) {}

  async getMe(user: UserEntity) {
    const result = await this.userDatabaseService.findUserWithRel(user, [
      'user_info',
    ]);

    return { ...user, user_info: result.user_info };
  }

  async getLikedSongs(user: UserEntity) {
    const songs = await this.songDatabaseService.findUserLikedSongs(user);

    return songs;
  }
}
