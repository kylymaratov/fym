import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import dbDataSource from 'src/database/database.provider';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserInfoEntity } from 'src/database/entities/user/user.info.entity';
import { RegisterDto } from 'src/modules/v1/auth/dto/register.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserDatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    @InjectRepository(UserInfoEntity)
    private userInfoRepository: Repository<UserInfoEntity>,
  ) {}

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserBySubId(user_sub_id: string) {
    return await this.userRepository.findOne({ where: { user_sub_id } });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findUserWithRel(user: UserEntity, rel: string[]) {
    return await this.userRepository.findOne({
      where: { id: user.id, email: user.email },
      relations: rel,
    });
  }

  async findUserSessionsById(id: number) {
    const client = await dbDataSource.connect();

    const sessions = await client.query(
      "SELECT * FROM sessions WHERE sess -> 'passport' ->> 'user' = $1",
      [id],
    );

    await dbDataSource.close();

    return sessions.map((session) => ({
      user_agent: session.sess.user_agent,
      secure: session.sess.cookie.secure,
      expire_date: session.sess.cookie.expires,
      user_ip: session.sess.user_ip,
    }));
  }

  async createUser(body: RegisterDto) {
    const queryRunner =
      this.userRepository.manager.connection.createQueryRunner();
    await queryRunner.startTransaction();

    try {
      const user = this.userRepository.create(body);
      const savedUser = await queryRunner.manager.save(user);

      const user_info = this.userInfoRepository.create({
        user: savedUser,
        user_sub_id: savedUser.user_sub_id,
      });
      const savedUserInfo = await queryRunner.manager.save(user_info);

      savedUser.user_info = savedUserInfo;

      await queryRunner.commitTransaction();

      return savedUser;
    } catch (error) {
      await queryRunner.rollbackTransaction();

      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
