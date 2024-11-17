import { Inject, Injectable } from '@nestjs/common';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserDatabaseService } from './services/database.service';
import { SongDatabaseService } from '../song/services/database.service';
import { SongSearchService } from '../song/services/search.service';

@Injectable()
export class UserService {
  constructor(
    @Inject() private userDatabaseService: UserDatabaseService,
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private songSearchService: SongSearchService,
  ) {}

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

  async getLikedSongs(user: UserEntity) {
    const songs = await this.songDatabaseService.findUserLikedSongs(user);

    return { title: 'Your liked songs', songs };
  }

  async getRecomendSongs(user: UserEntity) {
    const likedSongs = (await this.getLikedSongs(user)).songs;

    const response = { title: 'Songs for you', songs: [] };

    if (!likedSongs.length) return response;

    const randomSong =
      likedSongs[Math.floor(Math.random() * likedSongs.length)];

    response.songs = await this.songSearchService.getRelatedSongs(randomSong);

    return response;
  }
}
