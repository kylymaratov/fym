"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongDownloadService = void 0;
const common_1 = require("@nestjs/common");
const yt_dlp_exec_1 = require("yt-dlp-exec");
const database_service_1 = require("./database.service");
const telegram_bot_1 = require("../../../../bots/telegram.bot");
const urls_1 = require("../../../../constants/urls");
let SongDownloadService = class SongDownloadService {
    constructor(songDatabaseService, telegramBot) {
        this.songDatabaseService = songDatabaseService;
        this.telegramBot = telegramBot;
    }
    async downloadFromTelegram(song) {
        try {
            await this.songDatabaseService.updateDownloadingStatus(song, true);
            const buffer = await this.telegramBot.downloadSong(song);
            await this.songDatabaseService.setSongCache(song, buffer);
            return buffer;
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message, timeout: 60000 }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        finally {
            await this.songDatabaseService.updateDownloadingStatus(song, false);
        }
    }
    async downloadSong(song, quality = 1) {
        try {
            await this.songDatabaseService.updateDownloadingStatus(song, true);
            const buffer = await this.downloadingProccess(song, quality);
            const metadata = await this.telegramBot.uploadSong(song, buffer);
            await this.songDatabaseService.updateSongMetadata(song, metadata);
            await this.songDatabaseService.setSongCache(song, buffer);
            return { buffer, metadata };
        }
        catch (error) {
            throw new common_1.HttpException({ message: error.message, timeout: 60000 }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        }
        finally {
            await this.songDatabaseService.updateDownloadingStatus(song, false);
        }
    }
    downloadingProccess(song, quality) {
        return new Promise((resolve, reject) => {
            const chunks = [];
            const ytdlpProcess = (0, yt_dlp_exec_1.exec)(urls_1.URLS.WATCH_YT + song.song_id, {
                output: '-',
                format: 'bestaudio',
                noCheckCertificate: true,
                extractAudio: true,
                audioFormat: 'mp3',
                audioQuality: quality,
            });
            ytdlpProcess.stdout.on('data', (chunk) => {
                chunks.push(chunk);
            });
            ytdlpProcess.stdout.on('end', () => {
                const buffer = Buffer.concat(chunks);
                resolve(buffer);
            });
            ytdlpProcess.on('exit', (code) => {
                if (code !== 0) {
                    reject(new Error(`Download process exited with code ${code}`));
                }
            });
            ytdlpProcess.on('error', (error) => {
                reject(new Error(`Failed to download: ${error.message}`));
            });
        });
    }
};
exports.SongDownloadService = SongDownloadService;
exports.SongDownloadService = SongDownloadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)()),
    __param(1, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [database_service_1.SongDatabaseService,
        telegram_bot_1.TelegramBot])
], SongDownloadService);
//# sourceMappingURL=download.service.js.map