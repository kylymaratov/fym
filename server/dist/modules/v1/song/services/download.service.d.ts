import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongDatabaseService } from './database.service';
import { TelegramBot } from 'src/bots/telegram.bot';
export declare class SongDownloadService {
    private songDatabaseService;
    private telegramBot;
    constructor(songDatabaseService: SongDatabaseService, telegramBot: TelegramBot);
    downloadFromTelegram(song: SongEntity): Promise<Buffer>;
    downloadSong(song: SongEntity, quality?: number): Promise<{
        buffer: Buffer;
        metadata: SongMetadataEntity;
    }>;
    private downloadingProccess;
}
