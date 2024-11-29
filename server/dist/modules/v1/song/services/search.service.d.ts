import { SongDatabaseService } from './database.service';
import { ConvertUtil } from 'src/utils/convert.util';
import { SongEntity } from 'src/database/entities/song/song.entity';
export declare class SongSearchService {
    private songDatabaseService;
    private convertUtil;
    private readonly MAX_SONG_DURATION;
    private readonly MIN_SONG_DURATION;
    private readonly client;
    constructor(songDatabaseService: SongDatabaseService, convertUtil: ConvertUtil);
    getRelatedSongs(song_id: string): Promise<SongEntity[]>;
    findOneSong(songId: string): Promise<SongEntity>;
    search(query: string, limit?: number): Promise<SongEntity[]>;
    private convertYtdlCoreVideo;
    private getYtdlCoreAuthorAndTitle;
    private ytdlCoreSongCheck;
    private convertYoutubeIVideo;
    private youtubeISongCheck;
    private getYoutubeIAuthorAndTitle;
    private searchSongs;
}
