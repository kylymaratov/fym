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

  async getRelatedSongs(song: SongEntity): Promise<SongEntity[]> {
    const songs = await getBasicInfo(URLS.WATCH_YT + song.source_id);

    return await this.convertYtdlCoreVideo(songs.related_videos);
  }

  async searchOneSong(songId: string): Promise<SongEntity> {
    const { videoDetails } = await getBasicInfo(URLS.WATCH_YT + songId);

    const convertedSong: relatedVideo = {
      id: videoDetails.videoId,
      title: videoDetails.title,
      published: videoDetails.publishDate,
      author: videoDetails.author,
      ucid: '',
      author_thumbnail: '',
      short_view_count_text: '',
      view_count: '',
      length_seconds: Number(videoDetails.lengthSeconds) || 0,
      video_thumbnail: '',
      thumbnails: [],
      richThumbnails: [],
      isLive: videoDetails.isLiveContent,
    };

    const res = await this.convertYtdlCoreVideo([convertedSong]);

    return res[0];
  }

  async search(query: string, limit: number = 15) {
    const songs = await this.searchSongs(query, limit);

    return songs;
  }

  private async convertYtdlCoreVideo(
    videos: relatedVideo[],
  ): Promise<SongEntity[]> {
    const songs: SongEntity[] = [];

    for (let video of videos) {
      if (!this.ytdlCoreSongCheck(video, videos.length === 1)) {
        continue;
      }

      const { author, title, artist } = this.getYtdlCoreAuthorAndTitle(video);

      const upload_date = video.published
        ? this.convertUtil.convertDate(video.published)
        : null;

      const song: TSong = {
        source_id: video.id,
        title: title,
        artist: artist,
        author: author,
        duration: video.length_seconds,
        is_official: author === artist,
        original_title: video.title,
        upload_date,
      };

      const saved_song = await this.songDatabaseService.saveNewSong(song);
      songs.push(saved_song);
    }
    return songs;
  }

  private getYtdlCoreAuthorAndTitle(video: relatedVideo) {
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

  private ytdlCoreSongCheck(video: relatedVideo, skip_title?: boolean) {
    const checkDuration = (): boolean => {
      return (
        video.length_seconds <= this.MAX_SONG_DURATION &&
        video.length_seconds >= this.MIN_SONG_DURATION
      );
    };

    const checkByTitle = (): boolean => {
      if (skip_title) return true;

      return KEYWOARDS.SONG_TITLE.some((keywoard) =>
        video.title.includes(keywoard),
      );
    };

    return checkDuration() && checkByTitle();
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
      source_id: video.id,
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

  private async searchSongs(
    query: string,
    limit: number = 20,
  ): Promise<SongEntity[]> {
    const videos = await this.client.search(query, { type: 'video' });

    const songs: SongEntity[] = [];

    for (const [index, video] of videos.items.entries()) {
      if (index >= limit) break;

      if (video.isLive) continue;
      if (video.id === 'didyoumean') continue;
      if (!this.youtubeISongCheck(video)) continue;

      const song: TSong = this.convertYoutubeIVideo(video);

      const saved_song = await this.songDatabaseService.saveNewSong(song);

      songs.push(saved_song);
    }

    return songs;
  }
}
