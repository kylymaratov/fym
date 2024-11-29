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
exports.SongDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const song_cache_entity_1 = require("../../../../database/entities/song/song.cache.entity");
const song_entity_1 = require("../../../../database/entities/song/song.entity");
const song_metadata_entity_1 = require("../../../../database/entities/song/song.metadata.entity");
const typeorm_2 = require("typeorm");
const song_like_entity_1 = require("../../../../database/entities/song/song.like.entity");
const server_logger_1 = require("../../../../server/server.logger");
let SongDatabaseService = class SongDatabaseService {
    constructor(songRepository, songCacheRepository, songMetadataRepository, songLikeRepository, logger) {
        this.songRepository = songRepository;
        this.songCacheRepository = songCacheRepository;
        this.songMetadataRepository = songMetadataRepository;
        this.songLikeRepository = songLikeRepository;
        this.logger = logger;
        this.SONG_FIELDS = [
            'song.song_id AS song_id',
            'song.original_title AS original_title',
            'song.title AS title',
            'song.author AS author',
            'song.artist AS artist',
            'song.duration AS duration',
            'song.is_official AS is_official',
            'song.upload_date AS upload_date',
            'song.is_downloading AS is_downloading',
            'song.created AS created',
            'song.updated AS updated',
        ];
        this.MAX_CACHE_SIZE = 500;
    }
    async findBySongId(song_id, relations = []) {
        return await this.songRepository.findOne({
            where: { song_id },
            relations,
        });
    }
    async likeToSong(user, song) {
        const like = await this.songLikeRepository.findOne({
            where: { user: { id: user.id }, song: { song_id: song.song_id } },
        });
        if (like) {
            await this.songLikeRepository.remove(like);
            return false;
        }
        const new_like = this.songLikeRepository.create({
            song_id: song.song_id,
            user,
            song,
        });
        await this.songLikeRepository.save(new_like);
        return true;
    }
    async findRandomSongs(limit) {
        const randomSong = await this.songRepository
            .createQueryBuilder('song')
            .orderBy('RANDOM()')
            .limit(limit)
            .getMany();
        return randomSong;
    }
    async saveNewSong(song) {
        try {
            const ext_song = await this.songRepository.findOne({
                where: { song_id: song.song_id },
            });
            if (ext_song)
                return ext_song;
            const newSong = this.songRepository.create(song);
            return await this.songRepository.save(newSong);
        }
        catch { }
    }
    async setSongCache(song, buffer) {
        if (song.cache)
            return;
        this.cleanOldCachedSongs();
        const cache = this.songCacheRepository.create({
            song_id: song.song_id,
            buffer,
        });
        await this.songCacheRepository.save(cache);
        song.cache = cache;
        await this.songRepository.save(song);
    }
    async updateDownloadingStatus(song, is_downloading) {
        await this.songRepository.save({ ...song, is_downloading });
    }
    async updateSongLastAccessed(song) {
        await this.songCacheRepository
            .createQueryBuilder()
            .update(song_cache_entity_1.SongCacheEntity)
            .set({ last_accessed: () => 'NOW()' })
            .where('song_id = :song_id', { song_id: song.cache.song_id })
            .execute();
    }
    async incListenCount(songId) {
        await this.songRepository.increment({ song_id: songId }, 'listened_count', 1);
    }
    async updateSongMetadata(song, metadata) {
        const newMetadata = this.songMetadataRepository.create({
            song_id: song.song_id,
            ...metadata,
        });
        await this.songMetadataRepository.save(newMetadata);
        song.metadata = newMetadata;
        await this.songRepository.save(song);
    }
    async findMoreAuidionsSongs(limit) {
        const songs = await this.songRepository
            .createQueryBuilder('song')
            .orderBy('listened_count', 'DESC')
            .limit(limit)
            .getMany();
        return songs;
    }
    async findUserLikedSongs(user, limit) {
        const songs = await this.songRepository
            .createQueryBuilder('song')
            .leftJoin('song.song_likes', 'like')
            .select(this.SONG_FIELDS)
            .addSelect('COUNT(like.song_id)', 'like_count')
            .where('like.userId = :userId', { userId: user.id })
            .groupBy('song.id')
            .addGroupBy('song.song_id')
            .orderBy('like_count', 'DESC')
            .limit(limit)
            .getRawMany();
        return songs;
    }
    async findTopSongsByLike(limit) {
        const songs = await this.songRepository
            .createQueryBuilder('song')
            .leftJoin('song.song_likes', 'like')
            .select(this.SONG_FIELDS)
            .addSelect('COUNT(like.song_id)', 'likes')
            .groupBy('song.id')
            .addGroupBy('song.song_id')
            .orderBy('likes', 'DESC')
            .limit(limit)
            .getRawMany();
        return songs.map((song) => ({ ...song, likes: Number(song.likes) || 0 }));
    }
    async checkLikedSong(user, song_id) {
        const like = await this.songLikeRepository.findOne({
            where: { user: { id: user.id }, song: { song_id } },
        });
        return !!like;
    }
    async cleanOldCachedSongs() {
        try {
            const totalCacheSize = await this.songCacheRepository
                .createQueryBuilder('cache')
                .getCount();
            if (totalCacheSize >= this.MAX_CACHE_SIZE) {
                const oldCacheIds = await this.songCacheRepository
                    .createQueryBuilder('cache')
                    .select('cache.song_id')
                    .orderBy('cache.last_accessed', 'ASC')
                    .limit(totalCacheSize - this.MAX_CACHE_SIZE)
                    .getMany();
                if (oldCacheIds.length > 0) {
                    await this.songCacheRepository
                        .createQueryBuilder()
                        .delete()
                        .from(song_cache_entity_1.SongCacheEntity)
                        .whereInIds(oldCacheIds.map((cache) => cache.song_id))
                        .execute();
                }
            }
        }
        catch (error) {
            this.logger.error('Error while clear old songs caches: ' + error.message);
        }
    }
};
exports.SongDatabaseService = SongDatabaseService;
exports.SongDatabaseService = SongDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(song_entity_1.SongEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(song_cache_entity_1.SongCacheEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(song_metadata_entity_1.SongMetadataEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(song_like_entity_1.SongLikeEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        server_logger_1.ServerLogger])
], SongDatabaseService);
//# sourceMappingURL=database.service.js.map