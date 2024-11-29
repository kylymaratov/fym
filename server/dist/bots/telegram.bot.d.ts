import { SongEntity } from 'src/database/entities/song/song.entity';
import { SongMetadataEntity } from 'src/database/entities/song/song.metadata.entity';
import { ConvertUtil } from 'src/utils/convert.util';
export declare class TelegramBot {
    private convertUtil;
    private BOT_TOKEN;
    private TELEGRAM_CHAT_ID;
    private FILE_DOWNLOAD_URL;
    private IMAGE_URL;
    private IMAGE_QUALITY;
    constructor(convertUtil: ConvertUtil);
    sendLog(msg: string): Promise<void>;
    downloadSong(song: SongEntity): Promise<Buffer>;
    uploadSong(song: SongEntity, buffer: Buffer): Promise<SongMetadataEntity>;
    private getFile;
    private sendAudio;
    private downloadThumbnail;
}
