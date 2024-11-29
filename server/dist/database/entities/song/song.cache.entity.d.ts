import { SongEntity } from './song.entity';
export declare class SongCacheEntity {
    song_id: string;
    buffer: Buffer;
    last_accessed: Date;
    song: SongEntity;
}
