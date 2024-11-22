import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserDatabaseService } from '../user/services/database.service';
import { PasswrodUtil } from 'src/utils/password.util';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { Request } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private userDatabaseService: UserDatabaseService,
    @Inject() private passwrodUtil: PasswrodUtil,
    @Inject() private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userDatabaseService.findUserByEmail(email);

    if (!user) return null;

    const isMatch = await this.passwrodUtil.matchPassword(
      password,
      user.password,
    );

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async validateByUserId(userId: number) {
    return await this.userDatabaseService.findUserById(userId);
  }

  loginUser(req: Request, user: UserEntity) {
    const payload = { username: user.email, sub: user.id };
    const expiresIn = '10d';
    const expiresInMilliseconds = 10 * 24 * 60 * 60 * 1000;
    const access_token = this.jwtService.sign(payload, { expiresIn });

    req.session.access_token = access_token;
    req.session.user_agent = req.headers['user-agent'] || '';
    req.session.user_ip = (req.headers['x-forwarded-for'] as string) || req.ip;

    return {
      message: 'Successfilly logged',
      access_token,
      expiresInMilliseconds,
    };
  }

  async createUser(body: RegisterDto) {
    const { email, password } = body;
    const candidate = await this.userDatabaseService.findUserByEmail(email);

    if (candidate) throw new ConflictException('User already exists');

    const hashedPassword = await this.passwrodUtil.hashPassword(password, 12);

    body.password = hashedPassword;

    await this.userDatabaseService.createUser(body);

    return { message: 'User created' };
  }
}
