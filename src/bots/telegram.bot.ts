import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { serverEnv } from 'src/server/server.env';
import { ConvertUtil } from 'src/utils/convert.util';
import * as FormData from 'form-data';

@Injectable()
export class TelegramBot {
  private BOT_TOKEN: string = serverEnv.env.BOT_TOKEN;
  private TELEGRAM_CHAT_ID: string = serverEnv.isProd
    ? serverEnv.env.TELEGRAM_CHAT_ID
    : serverEnv.env.TELEGRAM_CHAT_ID;
  private FILE_DOWNLOAD_URL = `https://api.telegram.org/file/bot${this.BOT_TOKEN}/`;
  private IMAGE_URL = 'https://i3.ytimg.com/vi/';
  private IMAGE_QUALITY = '/hqdefault.jpg';

  constructor(private convertUtil: ConvertUtil) {}

  async sendLog(msg: string): Promise<void> {
    try {
      const formData = new FormData();
      formData.append('chat_id', this.TELEGRAM_CHAT_ID);
      formData.append('text', msg);

      await axios.post(
        `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`,
        formData,
        {
          headers: formData.getHeaders(),
          timeout: 10000,
        },
      );
    } catch (error) {
      console.error('Failed to send log to Telegram:', error.message);
    }
  }
  async downloadSong(song: SongEntity): Promise<Buffer> {
    const file = await this.getFile(song.metadata.file_id);
    const response = await axios.get(this.FILE_DOWNLOAD_URL + file.file_path, {
      responseType: 'arraybuffer',
    });
    return Buffer.from(response.data);
  }

  async uploadSong(
    song: SongEntity,
    buffer: Buffer,
  ): Promise<SongMetadataEntity> {
    const message = await this.sendAudio(song, buffer);
    const metadata = message.audio as SongMetadataEntity;
    return metadata;
  }

  private async getFile(fileId: string) {
    const response = await axios.post(
      `https://api.telegram.org/bot${this.BOT_TOKEN}/getFile`,
      { file_id: fileId },
    );
    return response.data.result;
  }

  private async sendAudio(song: SongEntity, buffer: Buffer) {
    const form = new FormData();
    form.append('chat_id', this.TELEGRAM_CHAT_ID);
    form.append('audio', buffer, {
      filename: this.convertUtil.convertCyrilicLatin(song.original_title),
      contentType: 'audio/mp3',
    });

    form.append('title', song.title || song.original_title);
    form.append('performer', song.author || song.artist);
    form.append('caption', '#song');

    const thumbUrl = this.IMAGE_URL + song.source_id + this.IMAGE_QUALITY;

    try {
      const thumbStream = await this.downloadThumbnail(thumbUrl);

      form.append('thumb', thumbStream, {
        filename: `${song.title}-thumb`,
        contentType: 'image/jpeg',
      });
    } catch {}

    const response = await axios.post(
      `https://api.telegram.org/bot${this.BOT_TOKEN}/sendAudio`,
      form,
      {
        headers: form.getHeaders(),
      },
    );

    return response.data.result;
  }

  private async downloadThumbnail(imageUrl: string) {
    const response = await axios.get(imageUrl, { responseType: 'stream' });
    return response.data;
  }
}
