import { Module } from '@nestjs/common';
import { SongController } from './song.controller';
import { SongService } from './song.service';
import { SongDatabaseService } from './services/database.service';
import { SongSearchService } from './services/search.service';
import { SongDownloadService } from './services/download.service';
import { TelegramBot } from 'src/bots/telegram.bot';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongCacheEntity } from 'src/database/entities/song/song.cache.entity';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { ConvertUtil } from 'src/utils/convert.util';
import { SongLikeEntity } from 'src/database/entities/song/song.like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      SongEntity,
      SongCacheEntity,
      SongMetadataEntity,
      SongLikeEntity,
    ]),
  ],
  controllers: [SongController],
  providers: [
    SongService,
    SongDatabaseService,
    SongSearchService,
    SongDownloadService,
    TelegramBot,
    ConvertUtil,
  ],
  exports: [SongDatabaseService, SongSearchService],
})
export class SongModule {}
