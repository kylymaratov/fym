import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { SongSearchService } from './services/search.service';
import { SearchSongsDto } from './dto/search.dto';
import { ListenSongDto } from './dto/listen.dto';
import { SongDatabaseService } from './services/database.service';
import { SongDownloadService } from './services/download.service';
import { UserEntity } from 'src/database/entities/user/user.entity';

@Injectable()
export class SongService {
  constructor(
    @Inject() private songSearchService: SongSearchService,
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private songDownloadService: SongDownloadService,
  ) {}

  async search(body: SearchSongsDto) {
    const { query, limit } = body;
    const result = await this.songSearchService.search(query, limit);

    return result;
  }

  async listen(query: ListenSongDto) {
    const { songId, quality } = query;

    const song = await this.songDatabaseService.findBySourceId(songId, [
      'cache',
      'metadata',
    ]);

    if (!song) throw new NotFoundException('Song not found in database');

    if (song.is_downloading)
      throw new HttpException(
        { message: 'Try later', ms: 25000 },
        HttpStatus.SERVICE_UNAVAILABLE,
      );

    if (song.cache) {
      await this.songDatabaseService.updateSongLastAccessed(song);

      return { metadata: song.metadata, buffer: song.cache.buffer };
    }

    if (song.metadata) {
      const buffer = await this.songDownloadService.downloadFromTelegram(song);

      return { buffer, metadata: song.metadata };
    }

    const { buffer, metadata } = await this.songDownloadService.downloadSong(
      song,
      quality,
    );

    return { buffer, metadata };
  }

  async like(user: UserEntity, songId: string) {
    const song = await this.songDatabaseService.findBySourceId(songId);

    if (!song) throw new NotFoundException('Song not found in database');

    const liked = await this.songDatabaseService.likeSong(user, song);

    return { message: 'OK', liked };
  }
}
