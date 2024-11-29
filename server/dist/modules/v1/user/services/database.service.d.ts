import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserInfoEntity } from 'src/database/entities/user/user.info.entity';
import { RegisterDto } from 'src/modules/v1/auth/dto/register.dto';
import { Repository } from 'typeorm';
export declare class UserDatabaseService {
    private userRepository;
    private userInfoRepository;
    constructor(userRepository: Repository<UserEntity>, userInfoRepository: Repository<UserInfoEntity>);
    findUserById(id: number): Promise<UserEntity>;
    findUserBySubId(user_sub_id: string): Promise<UserEntity>;
    findUserByEmail(email: string): Promise<UserEntity>;
    findUserWithRel(user: UserEntity, rel: string[]): Promise<UserEntity>;
    findUserSessionsById(id: number): Promise<any>;
    createUser(body: RegisterDto): Promise<UserEntity>;
}
