import { ConflictException, Inject, Injectable } from '@nestjs/common';
import { UserDatabaseService } from '../user/services/database.service';
import { PasswrodUtil } from 'src/utils/password.util';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject() private userDatabaseService: UserDatabaseService,
    @Inject() private passwrodUtil: PasswrodUtil,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userDatabaseService.findUserByEmail(email);

    if (!user) return null;

    const isMatch = this.passwrodUtil.matchPassword(password, user.password);

    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
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
