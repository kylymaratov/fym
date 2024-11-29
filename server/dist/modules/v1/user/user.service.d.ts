import { UserEntity } from 'src/database/entities/user/user.entity';
import { UserDatabaseService } from './services/database.service';
export declare class UserService {
    private userDatabaseService;
    constructor(userDatabaseService: UserDatabaseService);
    getMe(user: UserEntity): Promise<{
        user_info: import("../../../database/entities/user/user.info.entity").UserInfoEntity;
        id: number;
        user_sub_id: string;
        email: string;
        password: string;
        verified: boolean;
        song_likes: import("../../../database/entities/song/song.like.entity").SongLikeEntity[];
        playlist_likes: import("../../../database/entities/playlist/playlist.like.entity").PlaylistLikeEntity[];
        playlists: import("../../../database/entities/playlist/playlist.entity").PlaylistEntity[];
        created: Date;
        updated: Date;
    }>;
    getUserSessions(user: UserEntity): Promise<{
        user: UserEntity;
        sessions: any;
    }>;
}
