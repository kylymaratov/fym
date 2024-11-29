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
exports.SongController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const server_env_1 = require("../../../server/server.env");
const song_service_1 = require("./song.service");
const listen_dto_1 = require("./dto/listen.dto");
const stream_1 = require("stream");
const search_dto_1 = require("./dto/search.dto");
const user_decorator_1 = require("../../../decorators/user.decorator");
const user_entity_1 = require("../../../database/entities/user/user.entity");
const like_dto_1 = require("./dto/like.dto");
const getsong_dto_1 = require("./dto/getsong.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt.auth.guard");
let SongController = class SongController {
    constructor(songService) {
        this.songService = songService;
    }
    getSongById(query) {
        return this.songService.getSongById(query);
    }
    getMoreAuidionsSongs(query) {
        return this.songService.getMoreAuidionsSongs(query.limit);
    }
    getRelatedSongs(query) {
        return this.songService.getRelatedSongs(query.song_id);
    }
    getRandomSongs(query) {
        return this.songService.getRandomSongs(query.limit);
    }
    getTopSongsByLike(query) {
        return this.songService.getTopSongsByLike(query.limit);
    }
    getRecentlySongs(req, query) {
        return this.songService.getRecentlySongs(req.session.recently_plays || [], query.limit);
    }
    getLikedSongs(user, query) {
        return this.songService.getLikedSongs(user, query.limit);
    }
    getRecomendSongs(user) {
        return this.songService.getRecomendSongs(user);
    }
    async listenSong(query, req, res) {
        const { buffer, metadata } = await this.songService.listen(query);
        const contentLength = metadata.file_size;
        const contentType = metadata.mime_type;
        let start = 0;
        let end = contentLength - 1;
        if (req.headers['range']) {
            const range = req.headers['range'].replace(/bytes=/, '').split('-');
            start = parseInt(range[0], 10);
            end =
                range[1] && parseInt(range[1], 10) < contentLength
                    ? parseInt(range[1], 10)
                    : end;
        }
        res.setHeader('Accept-Ranges', 'bytes');
        res.setHeader('Content-Type', contentType);
        res.setHeader('Content-Length', end - start + 1);
        res.setHeader('Content-Range', `bytes ${start}-${end}/${contentLength}`);
        stream_1.Readable.from(buffer.slice(start, end + 1)).pipe(res);
        if (start === 0) {
            this.songService.icnListenCount(query.song_id);
            this.songService.addRecentlyPlays(req, query.song_id);
        }
    }
    searchSongs(body) {
        return this.songService.search(body);
    }
    likeToSong(user, query) {
        const { song_id } = query;
        return this.songService.likeToSong(user, song_id);
    }
};
exports.SongController = SongController;
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [getsong_dto_1.GetSongDto]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getSongById", null);
__decorate([
    (0, common_1.Get)('more-auditions'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getMoreAuidionsSongs", null);
__decorate([
    (0, common_1.Get)('related'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getRelatedSongs", null);
__decorate([
    (0, common_1.Get)('random'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getRandomSongs", null);
__decorate([
    (0, common_1.Get)('top-by-likes'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getTopSongsByLike", null);
__decorate([
    (0, common_1.Get)('recently'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getRecentlySongs", null);
__decorate([
    (0, common_1.Get)('liked'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, Object]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getLikedSongs", null);
__decorate([
    (0, common_1.Get)('recommendations'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.HttpCode)(200),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "getRecomendSongs", null);
__decorate([
    (0, common_1.Get)('listen'),
    (0, common_1.HttpCode)(206),
    __param(0, (0, common_1.Query)()),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [listen_dto_1.ListenSongDto, Object, Object]),
    __metadata("design:returntype", Promise)
], SongController.prototype, "listenSong", null);
__decorate([
    (0, common_1.Post)('search'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_dto_1.SearchSongsDto]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "searchSongs", null);
__decorate([
    (0, common_1.Put)('like'),
    (0, common_1.HttpCode)(200),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, like_dto_1.LikeSongDto]),
    __metadata("design:returntype", void 0)
], SongController.prototype, "likeToSong", null);
exports.SongController = SongController = __decorate([
    (0, swagger_1.ApiTags)('song'),
    (0, common_1.Controller)(`/api/${server_env_1.serverEnv.sv}/song`),
    __metadata("design:paramtypes", [song_service_1.SongService])
], SongController);
//# sourceMappingURL=song.controller.js.map