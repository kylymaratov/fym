import { Inject, Injectable } from '@nestjs/common';
import axios from 'axios';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { serverEnv } from 'src/server/server.env';
import { ConvertUtil } from 'src/utils/convert.util';
import { Readable } from 'stream';
import { Telegraf } from 'telegraf';

@Injectable()
export class TelegramBot {
  private BOT_TOKEN: string = serverEnv.env.BOT_TOKEN;
  private TELEGRAM_CHAT_ID: string = serverEnv.isProd
    ? serverEnv.env.TELEGRAM_CHAT_ID
    : serverEnv.env.TELEGRAM_CHAT_ID;
  private bot: Telegraf = new Telegraf(this.BOT_TOKEN);
  private FILE_DOWNLOAD_URL = `https://api.telegram.org/file/bot${process.env.BOT_TOKEN}/`;
  private INACTIVITY_TIMER: any;
  private IMAGE_URL = 'https://i3.ytimg.com/vi/';
  private IMAGE_QUALITY = '/hqdefault.jpg';

  constructor(@Inject() private convertUtil: ConvertUtil) {
    this.bot.on('message', (ctx) => {
      console.log(ctx.message.chat.id);
    });

    this.bot.launch();
  }

  async downloadSong(song: SongEntity): Promise<Buffer> {
    await this.checkConnection();

    const file = await this.bot.telegram.getFile(song.metadata.file_id);

    const response = await axios.get(this.FILE_DOWNLOAD_URL + file.file_path, {
      responseType: 'arraybuffer',
    });

    const buffer = Buffer.from(response.data);

    return buffer;
  }

  async uploadSong(
    song: SongEntity,
    buffer: Buffer,
  ): Promise<SongMetadataEntity> {
    await this.checkConnection();

    const message = await this.bot.telegram.sendAudio(
      this.TELEGRAM_CHAT_ID,
      {
        source: Readable.from(buffer),
        filename: this.convertUtil.convertCyrilicLatin(song.original_title),
      },
      {
        title: song.title,
        performer: song.author,
        thumbnail: {
          url: this.IMAGE_URL + song.source_id + this.IMAGE_QUALITY,
        },
      },
    );

    const metadata = message.audio as SongMetadataEntity;

    return metadata;
  }

  private resetTimer = () => {
    if (this.INACTIVITY_TIMER) clearTimeout(this.INACTIVITY_TIMER);
    this.INACTIVITY_TIMER = setTimeout(
      () => {
        this.bot.stop();
      },
      5 * 60 * 1000,
    );
  };

  private async checkConnection() {
    try {
      await this.bot.telegram.getMe();
    } catch {
      await this.bot.launch();
      this.resetTimer();
    }
  }
}
