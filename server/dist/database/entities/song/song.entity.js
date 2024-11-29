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
exports.SongEntity = void 0;
const typeorm_1 = require("typeorm");
const song_cache_entity_1 = require("./song.cache.entity");
const song_metadata_entity_1 = require("./song.metadata.entity");
const song_like_entity_1 = require("./song.like.entity");
const playlist_entity_1 = require("../playlist/playlist.entity");
let SongEntity = class SongEntity {
};
exports.SongEntity = SongEntity;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SongEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], SongEntity.prototype, "song_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SongEntity.prototype, "original_title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "author", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongEntity.prototype, "artist", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SongEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Boolean)
], SongEntity.prototype, "is_official", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Date)
], SongEntity.prototype, "upload_date", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: false }),
    __metadata("design:type", Boolean)
], SongEntity.prototype, "is_downloading", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", Number)
], SongEntity.prototype, "listened_count", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => song_like_entity_1.SongLikeEntity, (song_like) => song_like.song),
    __metadata("design:type", Array)
], SongEntity.prototype, "song_likes", void 0);
__decorate([
    (0, typeorm_1.ManyToMany)(() => playlist_entity_1.PlaylistEntity, (playlist) => playlist),
    __metadata("design:type", Array)
], SongEntity.prototype, "playlists", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => song_cache_entity_1.SongCacheEntity, (cache) => cache.song, {
        cascade: true,
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", song_cache_entity_1.SongCacheEntity)
], SongEntity.prototype, "cache", void 0);
__decorate([
    (0, typeorm_1.JoinColumn)(),
    (0, typeorm_1.OneToOne)(() => song_metadata_entity_1.SongMetadataEntity, (metadata) => metadata.song, {
        cascade: true,
        nullable: true,
        onDelete: 'SET NULL',
    }),
    __metadata("design:type", song_metadata_entity_1.SongMetadataEntity)
], SongEntity.prototype, "metadata", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], SongEntity.prototype, "created", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], SongEntity.prototype, "updated", void 0);
exports.SongEntity = SongEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'songs' })
], SongEntity);
//# sourceMappingURL=song.entity.js.map