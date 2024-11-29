import { SongService } from './song.service';
import { ListenSongDto } from './dto/listen.dto';
import { Request, Response } from 'express';
import { SearchSongsDto } from './dto/search.dto';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { LikeSongDto } from './dto/like.dto';
import { GetSongDto } from './dto/getsong.dto';
export declare class SongController {
    private readonly songService;
    constructor(songService: SongService);
    getSongById(query: GetSongDto): Promise<import("../../../database/entities/song/song.entity").SongEntity>;
    getMoreAuidionsSongs(query: {
        limit: number;
    }): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getRelatedSongs(query: {
        song_id: string;
    }): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getRandomSongs(query: {
        limit: number;
    }): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getTopSongsByLike(query: {
        limit: number;
    }): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getRecentlySongs(req: Request, query: {
        limit: number;
    }): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getLikedSongs(user: UserEntity, query: {
        limit: number;
    }): Promise<{
        title: string;
        songs: any[];
    }>;
    getRecomendSongs(user: UserEntity): Promise<{
        title: string;
        songs: any[];
    }>;
    listenSong(query: ListenSongDto, req: Request, res: Response): Promise<void>;
    searchSongs(body: SearchSongsDto): Promise<import("../../../database/entities/song/song.entity").SongEntity[]>;
    likeToSong(user: UserEntity, query: LikeSongDto): Promise<{
        message: string;
        liked: boolean;
    }>;
}
