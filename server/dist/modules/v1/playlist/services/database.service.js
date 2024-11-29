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
exports.PlaylistDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const playlist_entity_1 = require("../../../../database/entities/playlist/playlist.entity");
const typeorm_2 = require("typeorm");
const song_entity_1 = require("../../../../database/entities/song/song.entity");
let PlaylistDatabaseService = class PlaylistDatabaseService {
    constructor(playlistRepository, songRepository) {
        this.playlistRepository = playlistRepository;
        this.songRepository = songRepository;
    }
    async findPlaylists() {
        const playlists = await this.playlistRepository
            .createQueryBuilder('playlist')
            .leftJoinAndSelect('playlist.playlist_likes', 'like')
            .leftJoinAndSelect('playlist.user', 'user')
            .where('playlist.is_private = :isPrivate', { isPrivate: false })
            .loadRelationCountAndMap('playlist.likesCount', 'playlist.playlist_likes')
            .getMany();
        return playlists.map((item) => ({
            ...item,
            playlist_likes: Number(item.playlist_likes) || 0,
            user: item.user?.user_sub_id || null,
        }));
    }
    async findMyPlaylists(user) {
        const playlists = await this.playlistRepository.find({
            where: { user: { id: user.id } },
        });
        return playlists;
    }
    async createPlaylist(user, body) {
        const ext_playlist_name = await this.playlistRepository.findOne({
            where: { name: body.name },
        });
        if (ext_playlist_name)
            throw new common_1.BadRequestException('Playlist with name exists');
        const playlist = this.playlistRepository.create({
            user,
            name: body.name,
            is_private: body.is_private,
        });
        const savedPlaylist = await this.playlistRepository.save(playlist);
        return savedPlaylist;
    }
    async addToPlaylist(user, body) {
        const playlist = await this.playlistRepository.findOne({
            where: { playlist_id: body.playlist_id },
            relations: ['songs', 'user'],
        });
        if (!playlist) {
            throw new common_1.BadRequestException('Playlist not found');
        }
        if (playlist.user.id !== user.id) {
            throw new common_1.BadRequestException('You are not authorized to add songs to this playlist');
        }
        for (let song_id of body.songs) {
            const song = await this.songRepository.findOne({ where: { song_id } });
            if (!song)
                continue;
            playlist.songs.push(song);
            await this.playlistRepository.save(playlist);
        }
        return playlist;
    }
    async findPlaylistSongs(user, body) {
        const playlist = await this.playlistRepository.findOne({
            where: { playlist_id: body.playlist_id },
            relations: ['songs', 'user'],
        });
        if (playlist.is_private && user?.id !== playlist.user?.id)
            throw new common_1.BadRequestException('Is private playlist');
        return playlist;
    }
};
exports.PlaylistDatabaseService = PlaylistDatabaseService;
exports.PlaylistDatabaseService = PlaylistDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(playlist_entity_1.PlaylistEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(song_entity_1.SongEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], PlaylistDatabaseService);
//# sourceMappingURL=database.service.js.map