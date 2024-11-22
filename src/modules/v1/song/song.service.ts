import {
  BadRequestException,
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
import { GetSongDto } from './dto/getsong.dto';
import { Request } from 'express';

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

    const song = await this.songDatabaseService.findBySongId(songId, [
      'cache',
      'metadata',
    ]);

    if (!song) {
      const saved_song = await this.songSearchService.findOneSong(songId);
      if (!saved_song) {
        throw new BadRequestException(
          "I can't download this song. Maybe it's not a song, songId: " +
            songId,
        );
      }
      const { buffer, metadata } = await this.songDownloadService.downloadSong(
        saved_song,
        quality,
      );

      return { buffer, metadata };
    }

    if (song.is_downloading)
      throw new HttpException(
        { message: 'Try later', timeout: 25000 },
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

  async icnListenCount(songId: string) {
    try {
      await this.songDatabaseService.incListenCount(songId);
    } catch {}
  }

  async likeToSong(user: UserEntity, song_id: string) {
    const song = await this.songDatabaseService.findBySongId(song_id);

    if (!song) throw new NotFoundException('Song not found in database');

    const liked = await this.songDatabaseService.likeToSong(user, song);

    return { message: 'OK', liked };
  }

  async getTopSongsByLike(limit: number = 10) {
    const result = await this.songDatabaseService.findTopSongsByLike(limit);

    return { title: 'Top Songs', songs: result };
  }

  async getMoreAuidionsSongs(limit: number = 10) {
    const result = await this.songDatabaseService.findMoreAuidionsSongs(limit);

    return { title: 'Top listened songs', songs: result };
  }

  addRecentlyPlays(req: Request, song_id: string) {
    try {
      if (!req.session.recently_plays) {
        req.session.recently_plays = [song_id];
        return;
      }

      if (req.session.recently_plays.length > 50) {
        req.session.recently_plays.splice(0, 10);
      }

      if (req.session.recently_plays.includes(song_id)) {
        const index = req.session.recently_plays.indexOf(song_id);

        req.session.recently_plays.splice(index, 1);

        req.session.recently_plays.push(song_id);
        return;
      }

      req.session.recently_plays.push(song_id);
    } catch {}
  }

  async getRecentlySongs(recently_plays: string[], limit: number = 20) {
    const limitedRecentlyPlays = recently_plays.slice(0, limit).reverse();

    const songs = await Promise.all(
      limitedRecentlyPlays.map((recently) =>
        this.songDatabaseService.findBySongId(recently),
      ),
    );

    return { title: 'Recently plays', songs };
  }

  async getSongById(query: GetSongDto) {
    const { songId } = query;

    const song = await this.songDatabaseService.findBySongId(songId, [
      'metadata',
    ]);

    if (!song)
      throw new NotFoundException(`SongId: ${songId} not found in database`);

    return song;
  }

  async getRandomSongs(limit: number = 20) {
    const songs = await this.songDatabaseService.findRandomSongs(limit);

    return { title: 'Random songs', songs };
  }
}
