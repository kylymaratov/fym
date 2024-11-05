import { Module } from '@nestjs/common';
import { userService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserDatabaseService } from './services/database.service';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserInfoEntity } from 'src/database/entities/user/user.info.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, UserInfoEntity])],
  controllers: [UserController],
  providers: [userService, UserDatabaseService],
  exports: [UserDatabaseService],
})
export class UserModule {}
