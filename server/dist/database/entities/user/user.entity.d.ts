import { UserInfoEntity } from './user.info.entity';
import { SongLikeEntity } from '../song/song.like.entity';
import { PlaylistEntity } from '../playlist/playlist.entity';
import { PlaylistLikeEntity } from '../playlist/playlist.like.entity';
export declare class UserEntity {
    id: number;
    user_sub_id: string;
    email: string;
    password: string;
    verified: boolean;
    song_likes: SongLikeEntity[];
    playlist_likes: PlaylistLikeEntity[];
    user_info: UserInfoEntity | null;
    playlists: PlaylistEntity[];
    created: Date;
    updated: Date;
}
