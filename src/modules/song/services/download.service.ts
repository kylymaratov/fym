import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { exec } from 'yt-dlp-exec';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongDatabaseService } from './database.service';
import { TelegramBot } from 'src/bots/telegram.bot';
import { URLS } from 'src/constants/urls';

@Injectable()
export class SongDownloadService {
  constructor(
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private telegramBot: TelegramBot,
  ) {}

  async downloadFromTelegram(song: SongEntity): Promise<Buffer> {
    try {
      const buffer = await this.telegramBot.downloadSong(song);

      await this.songDatabaseService.setSongCache(song, buffer);

      return buffer;
    } catch {
      throw new HttpException(
        { message: 'Try later', ms: 60000 },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
  }

  async downloadSong(
    song: SongEntity,
    quality: number = 1,
  ): Promise<{ buffer: Buffer; metadata: SongMetadataEntity }> {
    try {
      await this.songDatabaseService.updateDownloadingStatus(song, true);
      const buffer = await this.downloadingProccess(song, quality);

      const metadata = await this.telegramBot.uploadSong(song, buffer);

      await this.songDatabaseService.updateSongMetadata(song, metadata);
      await this.songDatabaseService.setSongCache(song, buffer);

      return { buffer, metadata };
    } catch {
      throw new HttpException(
        { message: 'Try later', ms: 60000 },
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    } finally {
      await this.songDatabaseService.updateDownloadingStatus(song, false);
    }
  }

  private downloadingProccess(
    song: SongEntity,
    quality: number,
  ): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Buffer[] = [];

      const ytdlpProcess = exec(URLS.WATCH_YT + song.sourceId, {
        output: '-',
        format: 'bestaudio',
        noCheckCertificate: true,
        extractAudio: true,
        audioFormat: 'mp3',
        audioQuality: quality,
      });

      ytdlpProcess.stdout.on('data', (chunk: Buffer) => {
        chunks.push(chunk);
      });

      ytdlpProcess.stdout.on('end', () => {
        const buffer = Buffer.concat(chunks);

        resolve(buffer);
      });

      ytdlpProcess.on('error', () => {
        reject();
      });
    });
  }
}
