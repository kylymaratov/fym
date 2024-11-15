import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { serverEnv } from 'src/server/server.env';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: serverEnv.env.SERCRET_KEY,
    });
  }

  async validate(payload: any): Promise<any> {
    const user = await this.authService.validateByUserId(payload.sub);
    if (!user) throw new UnauthorizedException('Invalid token or expired');

    delete user.password;

    return user;
  }
}
