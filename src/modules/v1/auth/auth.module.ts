import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { SessionSerializer } from './serialize/session.serialize';
import { UserModule } from '../user/user.module';
import { PassportModule } from '@nestjs/passport';
import { PasswrodUtil } from 'src/utils/password.util';
import { JwtModule } from '@nestjs/jwt';
import { serverEnv } from 'src/server/server.env';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: serverEnv.env.SERCRET_KEY,
      signOptions: { expiresIn: '10d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    SessionSerializer,
    PasswrodUtil,
  ],
})
export class AuthModule {}
