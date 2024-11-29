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
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramBot = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const server_env_1 = require("../server/server.env");
const convert_util_1 = require("../utils/convert.util");
const FormData = require("form-data");
let TelegramBot = class TelegramBot {
    constructor(convertUtil) {
        this.convertUtil = convertUtil;
        this.BOT_TOKEN = server_env_1.serverEnv.env.BOT_TOKEN;
        this.TELEGRAM_CHAT_ID = server_env_1.serverEnv.isProd
            ? server_env_1.serverEnv.env.TELEGRAM_CHAT_ID
            : server_env_1.serverEnv.env.TELEGRAM_CHAT_ID;
        this.FILE_DOWNLOAD_URL = `https://api.telegram.org/file/bot${this.BOT_TOKEN}/`;
        this.IMAGE_URL = 'https://i3.ytimg.com/vi/';
        this.IMAGE_QUALITY = '/hqdefault.jpg';
    }
    async sendLog(msg) {
        try {
            const formData = new FormData();
            formData.append('chat_id', this.TELEGRAM_CHAT_ID);
            formData.append('text', msg);
            await axios_1.default.post(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`, formData, {
                headers: formData.getHeaders(),
                timeout: 10000,
            });
        }
        catch (error) {
            console.error('Failed to send log to Telegram:', error.message);
        }
    }
    async downloadSong(song) {
        const file = await this.getFile(song.metadata.file_id);
        const response = await axios_1.default.get(this.FILE_DOWNLOAD_URL + file.file_path, {
            responseType: 'arraybuffer',
        });
        return Buffer.from(response.data);
    }
    async uploadSong(song, buffer) {
        const message = await this.sendAudio(song, buffer);
        const metadata = message.audio;
        return metadata;
    }
    async getFile(fileId) {
        const response = await axios_1.default.post(`https://api.telegram.org/bot${this.BOT_TOKEN}/getFile`, { file_id: fileId });
        return response.data.result;
    }
    async sendAudio(song, buffer) {
        const form = new FormData();
        form.append('chat_id', this.TELEGRAM_CHAT_ID);
        form.append('audio', buffer, {
            filename: this.convertUtil.convertCyrilicLatin(song.original_title),
            contentType: 'audio/mp3',
        });
        form.append('title', song.title || song.original_title);
        form.append('performer', song.author || song.artist);
        form.append('caption', '#song');
        const thumbUrl = this.IMAGE_URL + song.song_id + this.IMAGE_QUALITY;
        try {
            const thumbStream = await this.downloadThumbnail(thumbUrl);
            form.append('thumb', thumbStream, {
                filename: `${song.title}-thumb`,
                contentType: 'image/jpeg',
            });
        }
        catch { }
        const response = await axios_1.default.post(`https://api.telegram.org/bot${this.BOT_TOKEN}/sendAudio`, form, {
            headers: form.getHeaders(),
        });
        return response.data.result;
    }
    async downloadThumbnail(imageUrl) {
        const response = await axios_1.default.get(imageUrl, { responseType: 'stream' });
        return response.data;
    }
};
exports.TelegramBot = TelegramBot;
exports.TelegramBot = TelegramBot = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [convert_util_1.ConvertUtil])
], TelegramBot);
//# sourceMappingURL=telegram.bot.js.map