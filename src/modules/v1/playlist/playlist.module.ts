import { Module } from '@nestjs/common';
import { PlaylistController } from './playlist.controller';
import { PlaylistService } from './playlist.service';
import { PlaylistDatabaseService } from './services/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlaylistEntity } from 'src/database/entities/playlist/playlist.entity';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { SongEntity } from 'src/database/entities/song/song.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PlaylistEntity, UserEntity, SongEntity])],
  controllers: [PlaylistController],
  providers: [PlaylistService, PlaylistDatabaseService],
})
export class PlaylistModule {}
