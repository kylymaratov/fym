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
    const result = await this.userDatabaseService.findUserWithRel(user, [
      'user_info',
    ]);

    return { ...user, user_info: result.user_info };
  }

  async getLikedSongs(user: UserEntity) {
    const songs = await this.songDatabaseService.findUserLikedSongs(user);

    return songs;
  }

  async getRandomSongsBaseOnLikes(user: UserEntity) {
    const likedSongs = await this.getLikedSongs(user);

    const response = { title: 'Base on your likes songs', data: [] };

    if (!likedSongs.length) return response;

    const randomSong =
      likedSongs[Math.floor(Math.random() * likedSongs.length)];

    response.data = await this.songSearchService.getRelatedSongs(randomSong);

    return response;
  }
}
