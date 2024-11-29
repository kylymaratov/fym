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
exports.SongLikeEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../user/user.entity");
const song_entity_1 = require("./song.entity");
let SongLikeEntity = class SongLikeEntity {
};
exports.SongLikeEntity = SongLikeEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], SongLikeEntity.prototype, "song_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (user) => user.song_likes, { nullable: false }),
    __metadata("design:type", user_entity_1.UserEntity)
], SongLikeEntity.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => song_entity_1.SongEntity, (song) => song.song_likes, { nullable: false }),
    __metadata("design:type", song_entity_1.SongEntity)
], SongLikeEntity.prototype, "song", void 0);
exports.SongLikeEntity = SongLikeEntity = __decorate([
    (0, typeorm_1.Entity)('song_like')
], SongLikeEntity);
//# sourceMappingURL=song.like.entity.js.map