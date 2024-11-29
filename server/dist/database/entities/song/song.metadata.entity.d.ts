import { SongEntity } from './song.entity';
export declare class SongMetadataEntity {
    song_id: string;
    file_id: string;
    file_unique_id: string;
    duration: number;
    performer: string;
    title: string;
    file_name: string;
    mime_type: string;
    file_size: number;
    thumbnail: {
        file_id: string;
        file_unique_id: string;
        width: number;
        height: number;
        file_size?: number;
    };
    song: SongEntity;
}
