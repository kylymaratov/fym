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
exports.SongSearchService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
const youtubei_1 = require("youtubei");
const convert_util_1 = require("../../../../utils/convert.util");
const keywoards_1 = require("../../../../constants/keywoards");
const regexp_1 = require("../../../../constants/regexp");
const ytdl_core_1 = require("ytdl-core");
const urls_1 = require("../../../../constants/urls");
let SongSearchService = class SongSearchService {
    constructor(songDatabaseService, convertUtil) {
        this.songDatabaseService = songDatabaseService;
        this.convertUtil = convertUtil;
        this.MAX_SONG_DURATION = 420;
        this.MIN_SONG_DURATION = 60;
        this.client = new youtubei_1.Client();
    }
    async getRelatedSongs(song_id) {
        const songs = await (0, ytdl_core_1.getBasicInfo)(urls_1.URLS.WATCH_YT + song_id);
        return await this.convertYtdlCoreVideo(songs.related_videos);
    }
    async findOneSong(songId) {
        const { videoDetails } = await (0, ytdl_core_1.getBasicInfo)(urls_1.URLS.WATCH_YT + songId);
        const convertedSong = {
            id: videoDetails.videoId,
            title: videoDetails.title,
            published: videoDetails.publishDate,
            author: videoDetails.author,
            ucid: '',
            author_thumbnail: '',
            short_view_count_text: '',
            view_count: '',
            length_seconds: Number(videoDetails.lengthSeconds) || 0,
            video_thumbnail: '',
            thumbnails: [],
            richThumbnails: [],
            isLive: videoDetails.isLiveContent,
        };
        const res = await this.convertYtdlCoreVideo([convertedSong]);
        return res[0];
    }
    async search(query, limit = 15) {
        const songs = await this.searchSongs(query, limit);
        return songs;
    }
    async convertYtdlCoreVideo(videos) {
        const songs = [];
        for (let video of videos) {
            if (!this.ytdlCoreSongCheck(video, videos.length === 1)) {
                continue;
            }
            const { author, title, artist } = this.getYtdlCoreAuthorAndTitle(video);
            const upload_date = video.published
                ? this.convertUtil.convertDate(video.published)
                : null;
            const song = {
                song_id: video.id,
                title: title,
                artist: artist,
                author: author,
                duration: video.length_seconds,
                is_official: author === artist,
                original_title: video.title,
                upload_date,
            };
            const saved_song = await this.songDatabaseService.saveNewSong(song);
            songs.push(saved_song);
        }
        return songs;
    }
    getYtdlCoreAuthorAndTitle(video) {
        const author = typeof video.author === 'string'
            ? video.author
            : video.author.name || null;
        const clreared_original_title = regexp_1.REXEGP.CLEAT_TITLE.reduce((acc, regex) => acc.replace(regex, ''), video.title).split('-');
        return {
            author,
            title: clreared_original_title[1]?.trim() || null,
            artist: clreared_original_title[0].trim() || null,
        };
    }
    ytdlCoreSongCheck(video, skip_title) {
        const checkDuration = () => {
            return (video.length_seconds <= this.MAX_SONG_DURATION &&
                video.length_seconds >= this.MIN_SONG_DURATION);
        };
        const checkByTitle = () => {
            if (skip_title)
                return true;
            return keywoards_1.KEYWOARDS.SONG_TITLE.some((keywoard) => video.title.includes(keywoard));
        };
        return checkDuration() && checkByTitle();
    }
    convertYoutubeIVideo(video) {
        const { author, title, artist } = this.getYoutubeIAuthorAndTitle(video);
        const upload_date = video.uploadDate
            ? this.convertUtil.convertDate(video.uploadDate)
            : null;
        return {
            title,
            author,
            artist,
            upload_date,
            duration: video.duration,
            song_id: video.id,
            original_title: video.title,
            is_official: author === artist,
        };
    }
    youtubeISongCheck(video) {
        const checkDuration = () => {
            return (video.duration <= this.MAX_SONG_DURATION &&
                video.duration >= this.MIN_SONG_DURATION);
        };
        const checkByTitle = () => {
            return keywoards_1.KEYWOARDS.SONG_TITLE.some((keywoard) => video.title.includes(keywoard));
        };
        return checkDuration() && checkByTitle();
    }
    getYoutubeIAuthorAndTitle(video) {
        const author = video.channel?.name.trim() || null;
        const clreared_original_title = regexp_1.REXEGP.CLEAT_TITLE.reduce((acc, regex) => acc.replace(regex, ''), video.title).split('-');
        return {
            author,
            title: clreared_original_title[1]?.trim() || null,
            artist: clreared_original_title[0].trim() || null,
        };
    }
    async searchSongs(query, limit = 20) {
        const videos = await this.client.search(query, { type: 'video' });
        const songs = [];
        for (const [index, video] of videos.items.entries()) {
            if (index >= limit)
                break;
            if (video.isLive)
                continue;
            if (video.id === 'didyoumean')
                continue;
            if (!this.youtubeISongCheck(video))
                continue;
            const song = this.convertYoutubeIVideo(video);
            const saved_song = await this.songDatabaseService.saveNewSong(song);
            songs.push(saved_song);
        }
        return songs;
    }
};
exports.SongSearchService = SongSearchService;
exports.SongSearchService = SongSearchService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)()),
    __param(1, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [database_service_1.SongDatabaseService,
        convert_util_1.ConvertUtil])
], SongSearchService);
//# sourceMappingURL=search.service.js.map