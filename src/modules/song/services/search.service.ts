import { Inject, Injectable } from '@nestjs/common';
import { SongDatabaseService } from './database.service';
import { TSong } from '../types/song.types';
import { Client, Video, VideoCompact } from 'youtubei';
import { ConvertUtil } from 'src/utils/convert.util';
import { KEYWOARDS } from 'src/constants/keywoards';
import { REXEGP } from 'src/constants/regexp';

@Injectable()
export class SongSearchService {
  private readonly maxSongDuration: number = 10000;
  private readonly client: Client = new Client();

  constructor(
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private convertUtil: ConvertUtil,
  ) {}

  async search(query: string, limit: number = 15) {
    const songs = await this.searchSongs(query, limit);

    return songs;
  }

  private convertVideoToSong(video: VideoCompact | Video): TSong {
    const { author, title, artist } = this.getAuthorAndTitle(video);
    const upload_date = video.uploadDate
      ? this.convertUtil.convertDate(video.uploadDate)
      : null;

    return {
      title,
      author,
      artist,
      upload_date,
      duration: video.duration as number,
      sourceId: video.id,
      original_title: video.title,
      is_official: author === artist,
    };
  }

  private songCheck(video: VideoCompact | Video) {
    const checkDuration = (): boolean => {
      return video.duration <= this.maxSongDuration;
    };

    const checkByTitle = (): boolean => {
      return KEYWOARDS.SONG_TITLE.some((keywoard) =>
        video.title.includes(keywoard),
      );
    };

    return checkDuration() && checkByTitle();
  }

  private getAuthorAndTitle(video: VideoCompact | Video) {
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

  private async searchSongs(
    query: string,
    limit: number = 20,
  ): Promise<TSong[]> {
    const videos = await this.client.search(query, { type: 'video' });

    const songs: TSong[] = [];

    for (const [index, video] of videos.items.entries()) {
      if (index >= limit) break;

      if (video.isLive) continue;
      if (video.id === 'didyoumean') continue;
      if (!this.songCheck(video)) continue;

      const song: TSong = this.convertVideoToSong(video);

      songs.push(song);

      await this.songDatabaseService.saveNewSong(song);
    }

    return songs;
  }
}
