import { Inject, Injectable } from '@nestjs/common';
import { SongDatabaseService } from './database.service';
import { TSong } from '../types/song.types';
import { Client, Video, VideoCompact } from 'youtubei';
import { ConvertUtil } from 'src/utils/convert.util';
import { KEYWOARDS } from 'src/constants/keywoards';
import { REXEGP } from 'src/constants/regexp';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { getBasicInfo, relatedVideo } from 'ytdl-core';
import { URLS } from 'src/constants/urls';

@Injectable()
export class SongSearchService {
  private readonly MAX_SONG_DURATION: number = 420;
  private readonly MIN_SONG_DURATION: number = 60;
  private readonly client: Client = new Client();

  constructor(
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private convertUtil: ConvertUtil,
  ) {}

  async getRelatedSongs(song: SongEntity): Promise<any[]> {
    const songs = await getBasicInfo(URLS.WATCH_YT + song.source_id);

    return await this.convertRelatedVideoToSong(songs.related_videos);
  }

  async search(query: string, limit: number = 15) {
    const songs = await this.searchSongs(query, limit);

    return songs;
  }

  private async convertRelatedVideoToSong(
    videos: relatedVideo[],
  ): Promise<TSong[]> {
    const result = [];
    for (let video of videos) {
      if (!this.relatedSongCheck(video)) continue;

      const { author, title, artist } = this.getRelatedAuthorAndTitle(video);

      const upload_date = video.published
        ? this.convertUtil.convertDate(video.published)
        : null;

      const song = {
        source_id: video.id,
        title: title,
        artist: artist,
        author: author,
        duration: video.length_seconds,
        is_official: false,
        original_title: video.title,
        upload_date,
      };

      result.push(song);

      await this.songDatabaseService.saveNewSong(song);
    }
    return result;
  }

  private getRelatedAuthorAndTitle(video: relatedVideo) {
    const author =
      typeof video.author === 'string'
        ? video.author
        : video.author.name || null;
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

  private relatedSongCheck(video: relatedVideo) {
    const checkDuration = (): boolean => {
      return (
        video.length_seconds <= this.MAX_SONG_DURATION &&
        video.length_seconds >= this.MIN_SONG_DURATION
      );
    };

    const checkByTitle = (): boolean => {
      return KEYWOARDS.SONG_TITLE.some((keywoard) =>
        video.title.includes(keywoard),
      );
    };

    return checkDuration() && checkByTitle();
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
      source_id: video.id,
      original_title: video.title,
      is_official: author === artist,
    };
  }

  private songCheck(video: VideoCompact | Video) {
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
