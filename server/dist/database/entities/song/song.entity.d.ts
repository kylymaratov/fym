import { SongCacheEntity } from './song.cache.entity';
import { SongMetadataEntity } from './song.metadata.entity';
import { SongLikeEntity } from './song.like.entity';
import { PlaylistEntity } from '../playlist/playlist.entity';
export declare class SongEntity {
    id: number;
    song_id: string;
    original_title: string;
    title: string;
    author: string;
    artist: string;
    duration: number;
    is_official: boolean;
    upload_date: Date | null;
    is_downloading: boolean;
    listened_count: number;
    song_likes: SongLikeEntity[];
    playlists: PlaylistEntity[];
    cache: SongCacheEntity | null;
    metadata: SongMetadataEntity | null;
    created: Date;
    updated: Date;
}
