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
exports.PlaylistLikeEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const playlist_entity_1 = require("./playlist.entity");
let PlaylistLikeEntity = class PlaylistLikeEntity {
};
exports.PlaylistLikeEntity = PlaylistLikeEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PlaylistLikeEntity.prototype, "playlist_id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    __metadata("design:type", String)
], PlaylistLikeEntity.prototype, "user_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.playlist_likes, {
        nullable: false,
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], PlaylistLikeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist.playlist_likes, {
        nullable: false,
    }),
    __metadata("design:type", playlist_entity_1.PlaylistEntity)
], PlaylistLikeEntity.prototype, "playlist", void 0);
exports.PlaylistLikeEntity = PlaylistLikeEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'playlist_like' })
], PlaylistLikeEntity);
//# sourceMappingURL=playlist.like.entity.js.map