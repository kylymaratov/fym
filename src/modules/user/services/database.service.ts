import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { RegisterDto } from 'src/modules/auth/dto/register.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UserDatabaseService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async findUserById(id: number) {
    return await this.userRepository.findOne({ where: { id } });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async createUser(body: RegisterDto) {
    const user = this.userRepository.create(body);

    await this.userRepository.save(user);
  }
}
