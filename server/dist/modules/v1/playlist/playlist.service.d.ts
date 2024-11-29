import { PlaylistDatabaseService } from './services/database.service';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { CreatePlaylistDto } from './dto/create.playlist.dto';
import { AddPlaylistDto } from './dto/add.playlist.dto';
import { GetPlaylistSongsDto } from './dto/get.playlist.songs.dto';
export declare class PlaylistService {
    private playlistDatabaseService;
    constructor(playlistDatabaseService: PlaylistDatabaseService);
    getPlaylists(): Promise<{
        playlist_likes: number;
        user: string;
        playlist_id: string;
        is_private: boolean;
        name: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
        created: Date;
        updated: Date;
    }[]>;
    createPlaylist(user: UserEntity, body: CreatePlaylistDto): Promise<{
        message: string;
    }>;
    addToPlaylist(user: UserEntity, body: AddPlaylistDto): Promise<{
        message: string;
    }>;
    getPlaylistSongs(user: UserEntity, body: GetPlaylistSongsDto): Promise<{
        title: string;
        songs: import("../../../database/entities/song/song.entity").SongEntity[];
    }>;
    getMyPlaylists(user: UserEntity): Promise<import("../../../database/entities/playlist/playlist.entity").PlaylistEntity[]>;
}
