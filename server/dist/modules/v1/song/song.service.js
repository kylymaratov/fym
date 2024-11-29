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
exports.SongService = void 0;
const common_1 = require("@nestjs/common");
const search_service_1 = require("./services/search.service");
const database_service_1 = require("./services/database.service");
const download_service_1 = require("./services/download.service");
let SongService = class SongService {
    constructor(songSearchService, songDatabaseService, songDownloadService) {
        this.songSearchService = songSearchService;
        this.songDatabaseService = songDatabaseService;
        this.songDownloadService = songDownloadService;
    }
    async search(body) {
        const { query, limit } = body;
        const result = await this.songSearchService.search(query, limit);
        return result;
    }
    async listen(query) {
        const { song_id, quality } = query;
        const song = await this.songDatabaseService.findBySongId(song_id, [
            'cache',
            'metadata',
        ]);
        if (!song) {
            const saved_song = await this.songSearchService.findOneSong(song_id);
            if (!saved_song) {
                throw new common_1.BadRequestException("I can't download this song. Maybe it's not a song, songId: " +
                    song_id);
            }
            const { buffer, metadata } = await this.songDownloadService.downloadSong(saved_song, quality);
            return { buffer, metadata };
        }
        if (song.is_downloading)
            throw new common_1.HttpException({ message: 'Try later', timeout: 25000 }, common_1.HttpStatus.SERVICE_UNAVAILABLE);
        if (song.cache) {
            await this.songDatabaseService.updateSongLastAccessed(song);
            return { metadata: song.metadata, buffer: song.cache.buffer };
        }
        if (song.metadata) {
            const buffer = await this.songDownloadService.downloadFromTelegram(song);
            return { buffer, metadata: song.metadata };
        }
        const { buffer, metadata } = await this.songDownloadService.downloadSong(song, quality);
        return { buffer, metadata };
    }
    async icnListenCount(songId) {
        try {
            await this.songDatabaseService.incListenCount(songId);
        }
        catch { }
    }
    async likeToSong(user, song_id) {
        const song = await this.songDatabaseService.findBySongId(song_id);
        if (!song)
            throw new common_1.NotFoundException('Song not found in database');
        const liked = await this.songDatabaseService.likeToSong(user, song);
        return { message: 'OK', liked };
    }
    async getTopSongsByLike(limit = 10) {
        const result = await this.songDatabaseService.findTopSongsByLike(limit);
        return { title: `Top songs by likes`, songs: result };
    }
    async getMoreAuidionsSongs(limit = 10) {
        const result = await this.songDatabaseService.findMoreAuidionsSongs(limit);
        return { title: `Top songs by listening`, songs: result };
    }
    addRecentlyPlays(req, song_id) {
        try {
            if (!req.session.recently_plays) {
                req.session.recently_plays = [song_id];
                return;
            }
            if (req.session.recently_plays.length >= 40) {
                req.session.recently_plays.pop();
            }
            if (req.session.recently_plays.includes(song_id)) {
                const index = req.session.recently_plays.indexOf(song_id);
                req.session.recently_plays.splice(index, 1);
            }
            req.session.recently_plays.unshift(song_id);
        }
        catch (error) {
            console.error('Error updating recently played songs:', error);
        }
    }
    async getRecentlySongs(recently_plays, limit = 20) {
        const limitedRecentlyPlays = recently_plays.slice(0, limit);
        const songs = await Promise.all(limitedRecentlyPlays.map((recently) => this.songDatabaseService.findBySongId(recently)));
        return { title: 'Recently plays', songs };
    }
    async getSongById(query) {
        const { songId } = query;
        const song = await this.songDatabaseService.findBySongId(songId, [
            'metadata',
        ]);
        if (!song)
            throw new common_1.NotFoundException(`SongId: ${songId} not found in database`);
        return song;
    }
    async getRandomSongs(limit = 20) {
        const songs = await this.songDatabaseService.findRandomSongs(limit);
        return { title: 'Random songs', songs };
    }
    async checkLikedSong(user, song_id) {
        const result = await this.songDatabaseService.checkLikedSong(user, song_id);
        return result;
    }
    async getLikedSongs(user, limit = 20) {
        const songs = await this.songDatabaseService.findUserLikedSongs(user, limit);
        return { title: 'Your liked songs', songs };
    }
    async getRecomendSongs(user) {
        const likedSongs = (await this.getLikedSongs(user)).songs;
        const response = { title: 'Best songs for you', songs: [] };
        if (!likedSongs.length)
            return response;
        const randomSong = likedSongs[Math.floor(Math.random() * likedSongs.length)];
        response.songs = await this.songSearchService.getRelatedSongs(randomSong.song_id);
        return response;
    }
    async getRelatedSongs(song_id) {
        try {
            const related_songs = await this.songSearchService.getRelatedSongs(song_id);
            return {
                title: 'Related songs',
                songs: related_songs,
            };
        }
        catch {
            return { title: 'Related songs', songs: [] };
        }
    }
};
exports.SongService = SongService;
exports.SongService = SongService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)()),
    __param(1, (0, common_1.Inject)()),
    __param(2, (0, common_1.Inject)()),
    __metadata("design:paramtypes", [search_service_1.SongSearchService,
        database_service_1.SongDatabaseService,
        download_service_1.SongDownloadService])
], SongService);
//# sourceMappingURL=song.service.js.map