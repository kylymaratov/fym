import { Inject, Injectable } from '@nestjs/common';
import { SongDatabaseService } from './database.service';
import { TSong } from '../types/song.types';
import { Client, Video, VideoCompact } from 'youtubei';
import { ConvertUtil } from 'src/utils/convert.util';
import { KEYWOARDS } from 'src/constants/keywoards';
import { REXEGP } from 'src/constants/regexp';
import { SongEntity } from 'src/database/entities/song/song.entity';

@Injectable()
export class SongSearchService {
  private readonly MAX_SONG_DURATION: number = 420;
  private readonly MIN_SONG_DURATION: number = 60;
  private readonly client: Client = new Client();

  constructor(
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private convertUtil: ConvertUtil,
  ) {}

  async getRelatedSongs(song_id: string): Promise<SongEntity[]> {
    const videos = (await this.client.getVideo(song_id))?.related?.items || [];

    return await this.convertSongs(videos as VideoCompact[], 30);
  }

  async findOneSong(songId: string): Promise<SongEntity> {
    const video = await this.client.getVideo(songId);

    if (video.isLiveContent) return;

    const songs = await this.convertSongs([video as Video]);

    return songs[0];
  }

  async search(query: string, limit: number) {
    const videos = await this.client.search(query, { type: 'video' });

    const songs = await this.convertSongs(videos.items, limit);

    return songs;
  }

  private convertYoutubeIVideo(video: VideoCompact | Video): TSong {
    const { author, title, artist } = this.getYoutubeIAuthorAndTitle(video);
    const upload_date = video.uploadDate
      ? this.convertUtil.convertDate(video.uploadDate)
      : null;

    return {
      title,
      author,
      artist,
      upload_date,
      duration: video.duration as number,
      song_id: video.id,
      original_title: video.title,
      is_official: author === artist,
    };
  }

  private youtubeISongCheck(video: VideoCompact | Video) {
    const checkDuration = (): boolean => {
      return (
        video.duration <= this.MAX_SONG_DURATION &&
        video.duration >= this.MIN_SONG_DURATION
      );
    };

    const checkByTitle = (): boolean => {
      return KEYWOARDS.SONG_TITLE.some((keywoard) =>
        video.title.includes(keywoard),
      );
    };

    return checkDuration() && checkByTitle();
  }

  private getYoutubeIAuthorAndTitle(video: VideoCompact | Video) {
    const author = video.channel?.name.trim() || null;
    const clreared_original_title = REXEGP.CLEAT_TITLE.reduce(
      (acc, regex) => acc.replace(regex, ''),
      video.title,
    ).split('-');

    return {
      author,
      title: clreared_original_title[1]?.trim() || null,
      artist: clreared_original_title[0].trim() || null,
    };
  }

  private async convertSongs(
    videos: Video[] | VideoCompact[],
    limit: number = 15,
  ): Promise<SongEntity[]> {
    const songs: SongEntity[] = [];

    for (const [index, video] of videos.entries()) {
      if (index >= limit) break;

      if (video instanceof VideoCompact && video.isLive) continue;
      if (video.id === 'didyoumean') continue;
      if (!this.youtubeISongCheck(video)) continue;

      const song: TSong = this.convertYoutubeIVideo(video);

      const saved_song = await this.songDatabaseService.saveNewSong(song);

      songs.push(saved_song);
    }

    return songs;
  }
}
