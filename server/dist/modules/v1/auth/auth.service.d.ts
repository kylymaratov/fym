import { UserDatabaseService } from '../user/services/database.service';
import { PasswrodUtil } from 'src/utils/password.util';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { Request } from 'express';
export declare class AuthService {
    private userDatabaseService;
    private passwrodUtil;
    private jwtService;
    constructor(userDatabaseService: UserDatabaseService, passwrodUtil: PasswrodUtil, jwtService: JwtService);
    validateUser(email: string, password: string): Promise<{
        id: number;
        user_sub_id: string;
        email: string;
        verified: boolean;
        song_likes: import("../../../database/entities/song/song.like.entity").SongLikeEntity[];
        playlist_likes: import("../../../database/entities/playlist/playlist.like.entity").PlaylistLikeEntity[];
        user_info: import("../../../database/entities/user/user.info.entity").UserInfoEntity | null;
        playlists: import("../../../database/entities/playlist/playlist.entity").PlaylistEntity[];
        created: Date;
        updated: Date;
    }>;
    validateByUserId(userId: number): Promise<UserEntity>;
    loginUser(req: Request, user: UserEntity): Promise<{
        access_token: string;
        expiresInMilliseconds: number;
    }>;
    createUser(body: RegisterDto): Promise<{
        message: string;
    }>;
}
