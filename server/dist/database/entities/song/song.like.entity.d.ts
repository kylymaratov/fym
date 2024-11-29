import { UserEntity } from '../user/user.entity';
import { SongEntity } from './song.entity';
export declare class SongLikeEntity {
    song_id: string;
    user: UserEntity;
    song: SongEntity;
}
