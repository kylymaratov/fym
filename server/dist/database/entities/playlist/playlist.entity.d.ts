import { UserEntity } from '../user/user.entity';
import { SongEntity } from '../song/song.entity';
import { PlaylistLikeEntity } from './playlist.like.entity';
export declare class PlaylistEntity {
    playlist_id: string;
    is_private: boolean;
    name: string;
    songs: SongEntity[];
    user: UserEntity;
    playlist_likes: PlaylistLikeEntity[];
    created: Date;
    updated: Date;
}
