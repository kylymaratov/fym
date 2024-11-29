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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const user_info_entity_1 = require("./user.info.entity");
const song_like_entity_1 = require("../song/song.like.entity");
const playlist_entity_1 = require("../playlist/playlist.entity");
const playlist_like_entity_1 = require("../playlist/playlist.like.entity");
let UserEntity = class UserEntity {
};
exports.UserEntity = UserEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'uuid', unique: true, default: () => 'uuid_generate_v4()' }),
    __metadata("design:type", String)
], UserEntity.prototype, "user_sub_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true, nullable: false }),
    (0, typeorm_1.Index)(),
    __metadata("design:type", String)
], UserEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], UserEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], UserEntity.prototype, "verified", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => song_like_entity_1.SongLikeEntity, (song_like) => song_like.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "song_likes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => playlist_like_entity_1.PlaylistLikeEntity, (playlist_like) => playlist_like.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "playlist_likes", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => user_info_entity_1.UserInfoEntity, (userInfo) => userInfo.user, {
        cascade: true,
        onDelete: 'SET NULL',
        nullable: true,
    }),
    __metadata("design:type", user_info_entity_1.UserInfoEntity)
], UserEntity.prototype, "user_info", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToMany)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist.user),
    __metadata("design:type", Array)
], UserEntity.prototype, "playlists", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], UserEntity.prototype, "updated", void 0);
exports.UserEntity = UserEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'users' })
], UserEntity);
//# sourceMappingURL=user.entity.js.map