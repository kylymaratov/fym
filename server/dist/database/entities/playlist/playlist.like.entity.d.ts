import { UserEntity } from '../user/user.entity';
import { PlaylistEntity } from './playlist.entity';
export declare class PlaylistLikeEntity {
    playlist_id: string;
    user_id: string;
    user: UserEntity;
    playlist: PlaylistEntity;
}
