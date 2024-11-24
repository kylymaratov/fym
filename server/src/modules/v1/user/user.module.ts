import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDatabaseService } from './services/database.service';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserInfoEntity } from 'src/database/entities/user/user.info.entity';
import { SongModule } from '../song/song.module';

@Module({
  imports: [SongModule, TypeOrmModule.forFeature([UserEntity, UserInfoEntity])],
  controllers: [UserController],
  providers: [UserService, UserDatabaseService],
  exports: [UserDatabaseService],
})
export class UserModule {}
