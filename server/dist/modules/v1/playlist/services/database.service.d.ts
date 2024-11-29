import { PlaylistEntity } from 'src/database/entities/playlist/playlist.entity';
import { UserEntity } from 'src/database/entities/user/user.entity';
import { Repository } from 'typeorm';
import { CreatePlaylistDto } from '../dto/create.playlist.dto';
import { AddPlaylistDto } from '../dto/add.playlist.dto';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { GetPlaylistSongsDto } from '../dto/get.playlist.songs.dto';
export declare class PlaylistDatabaseService {
    private playlistRepository;
    private songRepository;
    constructor(playlistRepository: Repository<PlaylistEntity>, songRepository: Repository<SongEntity>);
    findPlaylists(): Promise<{
        playlist_likes: number;
        user: string;
        playlist_id: string;
        is_private: boolean;
        name: string;
        songs: SongEntity[];
        created: Date;
        updated: Date;
    }[]>;
    findMyPlaylists(user: UserEntity): Promise<PlaylistEntity[]>;
    createPlaylist(user: UserEntity, body: CreatePlaylistDto): Promise<PlaylistEntity>;
    addToPlaylist(user: UserEntity, body: AddPlaylistDto): Promise<PlaylistEntity>;
    findPlaylistSongs(user: UserEntity, body: GetPlaylistSongsDto): Promise<PlaylistEntity>;
}
