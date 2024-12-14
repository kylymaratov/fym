import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserDatabaseService } from './services/database.service';
import { SongDatabaseService } from '../song/services/database.service';
import { SongSearchService } from '../song/services/search.service';

@Injectable()
export class UserService {
  constructor(@Inject() private userDatabaseService: UserDatabaseService) {}

  async getMe(user: UserEntity) {
    const { user_info } = await this.userDatabaseService.findUserWithRel(user, [
      'user_info',
    ]);

    return { ...user, user_info };
  }

  async getUserSessions(user: UserEntity) {
    const sessions = await this.userDatabaseService.findUserSessionsById(
      user.id,
    );

    return { user, sessions };
  }
}
