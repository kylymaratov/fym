import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './serialize/session.serialize';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PasswrodUtil } from 'src/utils/password.util';

@Module({
  imports: [UserModule, PassportModule],
  controllers: [AuthController],
  providers: [AuthService, LocalStrategy, SessionSerializer, PasswrodUtil],
})
export class AuthModule {}
