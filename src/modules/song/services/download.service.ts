import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { exec } from 'yt-dlp-exec';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongDatabaseService } from './database.service';
import { TelegramBot } from 'src/bots/telegram.bot';
import { URLS } from 'src/constants/urls';
import { ServerLogger } from 'src/server/server.logger';

@Injectable()
export class SongDownloadService {
  constructor(
    @Inject() private songDatabaseService: SongDatabaseService,
    @Inject() private telegramBot: TelegramBot,
    private logger: ServerLogger,
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
    } catch (error) {
      throw new HttpException(
        { message: (error as Error).message, timeout: 60000 },
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

      const ytdlpProcess = exec(URLS.WATCH_YT + song.source_id, {
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

      ytdlpProcess.on('exit', (code) => {
        if (code !== 0) {
          reject(new Error(`Download process exited with code ${code}`));
        }
      });

      ytdlpProcess.on('error', (error) => {
        reject(new Error(`Failed to download: ${error.message}`));
      });
    });
  }
}
