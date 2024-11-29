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
exports.SongMetadataEntity = void 0;
const typeorm_1 = require("typeorm");
const song_entity_1 = require("./song.entity");
let SongMetadataEntity = class SongMetadataEntity {
};
exports.SongMetadataEntity = SongMetadataEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "song_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "file_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "file_unique_id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], SongMetadataEntity.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "performer", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "title", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "file_name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], SongMetadataEntity.prototype, "mime_type", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SongMetadataEntity.prototype, "file_size", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true, type: 'json' }),
    __metadata("design:type", Object)
], SongMetadataEntity.prototype, "thumbnail", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => song_entity_1.SongEntity, (song) => song.metadata),
    __metadata("design:type", song_entity_1.SongEntity)
], SongMetadataEntity.prototype, "song", void 0);
exports.SongMetadataEntity = SongMetadataEntity = __decorate([
    (0, typeorm_1.Entity)({ name: 'song_metadata' })
], SongMetadataEntity);
//# sourceMappingURL=song.metadata.entity.js.map