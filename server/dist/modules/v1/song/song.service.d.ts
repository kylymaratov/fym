import { SongSearchService } from './services/search.service';
import { SearchSongsDto } from './dto/search.dto';
import { ListenSongDto } from './dto/listen.dto';
import { SongDatabaseService } from './services/database.service';
import { SongDownloadService } from './services/download.service';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { GetSongDto } from './dto/getsong.dto';
import { Request } from 'express';
export declare class SongService {
    private songSearchService;
    private songDatabaseService;
    private songDownloadService;
    constructor(songSearchService: SongSearchService, songDatabaseService: SongDatabaseService, songDownloadService: SongDownloadService);
    search(body: SearchSongsDto): Promise<import("../../../database/entities/song/song.entity").SongEntity[]>;
    listen(query: ListenSongDto): Promise<{
        buffer: Buffer;
        metadata: import("../../../database/entities/song/song.metadata.entity").SongMetadataEntity;
    }>;
    icnListenCount(songId: string): Promise<void>;
    likeToSong(user: UserEntity, song_id: string): Promise<{
        message: string;
        liked: boolean;
    }>;
    getTopSongsByLike(limit?: number): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getMoreAuidionsSongs(limit?: number): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    addRecentlyPlays(req: Request, song_id: string): void;
    getRecentlySongs(recently_plays: string[], limit?: number): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getSongById(query: GetSongDto): Promise<import("../../../database/entities/song/song.entity").SongEntity>;
    getRandomSongs(limit?: number): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    checkLikedSong(user: UserEntity, song_id: any): Promise<boolean>;
    getLikedSongs(user: UserEntity, limit?: number): Promise<{
        title: string;
        songs: any[];
    }>;
    getRecomendSongs(user: UserEntity): Promise<{
        title: string;
        songs: any[];
    }>;
    getRelatedSongs(song_id: string): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
}
