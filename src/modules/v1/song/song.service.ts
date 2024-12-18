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
    const { song_id, quality } = query;

    const song = await this.songDatabaseService.findBySongId(song_id, [
      'cache',
      'metadata',
    ]);

    if (!song) {
      const saved_song = await this.songSearchService.findOneSong(song_id);
      if (!saved_song) {
        throw new BadRequestException(
          "I can't download this song. Maybe it's not a song, songId: " +
            song_id,
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

    return { title: `Top songs by likes`, songs: result };
  }

  async getMoreAuidionsSongs(limit: number = 10) {
    const result = await this.songDatabaseService.findMoreAuidionsSongs(limit);

    return { title: `Top songs by listening`, songs: result };
  }

  addRecentlyPlays(req: Request, song_id: string) {
    try {
      if (!req.session.recently_plays) {
        req.session.recently_plays = [song_id];
        return;
      }

      if (req.session.recently_plays.length >= 40) {
        req.session.recently_plays.pop();
      }

      if (req.session.recently_plays.includes(song_id)) {
        const index = req.session.recently_plays.indexOf(song_id);
        req.session.recently_plays.splice(index, 1);
      }

      req.session.recently_plays.unshift(song_id);
    } catch (error) {
      console.error('Error updating recently played songs:', error);
    }
  }

  async getRecentlySongs(recently_plays: string[], limit: number = 20) {
    const limitedRecentlyPlays = recently_plays.slice(0, limit);

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

  async checkLikedSong(user: UserEntity, song_id) {
    const result = await this.songDatabaseService.checkLikedSong(user, song_id);

    return result;
  }

  async getLikedSongs(user: UserEntity, limit: number = 20) {
    const songs = await this.songDatabaseService.findUserLikedSongs(
      user,
      limit,
    );

    return { title: 'Your liked songs', songs };
  }

  async getRecomendSongs(user: UserEntity) {
    const likedSongs = (await this.getLikedSongs(user)).songs;

    const response = { title: 'Best songs for you', songs: [] };

    if (!likedSongs.length) return response;

    const randomSong =
      likedSongs[Math.floor(Math.random() * likedSongs.length)];

    response.songs = await this.songSearchService.getRelatedSongs(
      randomSong.song_id,
    );

    return response;
  }

  async getRelatedSongs(song_id: string) {
    try {
      const song = await this.songDatabaseService.findBySongId(song_id);
      const related_songs =
        await this.songSearchService.getRelatedSongs(song_id);

      return {
        title: 'Related songs',
        songs: [song, ...related_songs],
      };
    } catch (error) {
      console.log(error);
      return { title: 'Related songs', songs: [] };
    }
  }
}
