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
exports.PlaylistEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const song_entity_1 = require("../song/song.entity");
const playlist_like_entity_1 = require("./playlist.like.entity");
let PlaylistEntity = class PlaylistEntity {
};
exports.PlaylistEntity = PlaylistEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], PlaylistEntity.prototype, "playlist_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], PlaylistEntity.prototype, "is_private", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false }),
    __metadata("design:type", String)
], PlaylistEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.JoinTable)(),
    (0, typeorm_1.ManyToMany)(() => song_entity_1.SongEntity, (song) => song.playlists),
    __metadata("design:type", Array)
], PlaylistEntity.prototype, "songs", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.playlists),
    __metadata("design:type", user_entity_1.UserEntity)
], PlaylistEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlist_like_entity_1.PlaylistLikeEntity, (playlist) => playlist.playlist),
    __metadata("design:type", Array)
], PlaylistEntity.prototype, "playlist_likes", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], PlaylistEntity.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], PlaylistEntity.prototype, "updated", void 0);
exports.PlaylistEntity = PlaylistEntity = __decorate([
    (0, typeorm_1.Entity)('playlists')
], PlaylistEntity);
//# sourceMappingURL=playlist.entity.js.map