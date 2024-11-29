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
exports.PlaylistController = void 0;
const common_1 = require("@nestjs/common");
const playlist_service_1 = require("./playlist.service");
const server_env_1 = require("../../../server/server.env");
const jwt_auth_guard_1 = require("../auth/guards/jwt.auth.guard");
const user_decorator_1 = require("../../../decorators/user.decorator");
const user_entity_1 = require("../../../database/entities/user/user.entity");
const create_playlist_dto_1 = require("./dto/create.playlist.dto");
const add_playlist_dto_1 = require("./dto/add.playlist.dto");
const get_playlist_songs_dto_1 = require("./dto/get.playlist.songs.dto");
let PlaylistController = class PlaylistController {
    constructor(playlistService) {
        this.playlistService = playlistService;
    }
    getPlaylists() {
        return this.playlistService.getPlaylists();
    }
    getMyPlaylists(user) {
        return this.playlistService.getMyPlaylists(user);
    }
    getPlaylistSongs(user, body) {
        return this.playlistService.getPlaylistSongs(user, body);
    }
    createPlaylist(user, body) {
        return this.playlistService.createPlaylist(user, body);
    }
    addToPlaylist(user, body) {
        return this.playlistService.addToPlaylist(user, body);
    }
};
exports.PlaylistController = PlaylistController;
__decorate([
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "getPlaylists", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Get)('my'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "getMyPlaylists", null);
__decorate([
    (0, common_1.Get)('songs'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        get_playlist_songs_dto_1.GetPlaylistSongsDto]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "getPlaylistSongs", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Post)('create'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity,
        create_playlist_dto_1.CreatePlaylistDto]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "createPlaylist", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, common_1.Put)('add'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_entity_1.UserEntity, add_playlist_dto_1.AddPlaylistDto]),
    __metadata("design:returntype", void 0)
], PlaylistController.prototype, "addToPlaylist", null);
exports.PlaylistController = PlaylistController = __decorate([
    (0, common_1.Controller)(`/api/${server_env_1.serverEnv.sv}/playlist`),
    __metadata("design:paramtypes", [playlist_service_1.PlaylistService])
], PlaylistController);
//# sourceMappingURL=playlist.controller.js.map