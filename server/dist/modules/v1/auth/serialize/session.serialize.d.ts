import { PassportSerializer } from '@nestjs/passport';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserDatabaseService } from 'src/modules/v1/user/services/database.service';
export declare class SessionSerializer extends PassportSerializer {
    private readonly userDatabaseService;
    constructor(userDatabaseService: UserDatabaseService);
    serializeUser(user: UserEntity, done: (err: Error, id: number) => void): void;
    deserializeUser(id: number, done: (err: any, user: any) => void): Promise<void>;
}
