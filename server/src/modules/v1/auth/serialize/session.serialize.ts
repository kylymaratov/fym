import { Inject } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserDatabaseService } from 'src/modules/v1/user/services/database.service';

export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject() private readonly userDatabaseService: UserDatabaseService,
  ) {
    super();
  }

  serializeUser(user: UserEntity, done: (err: Error, id: number) => void) {
    done(null, user.id);
  }

  async deserializeUser(id: number, done: (err, user) => void) {
    const user = await this.userDatabaseService.findUserById(id);

    if (user) {
      delete user.password;
    }

    return done(null, user);
  }
}
