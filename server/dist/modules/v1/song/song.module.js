"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongModule = void 0;
const common_1 = require("@nestjs/common");
const song_controller_1 = require("./song.controller");
const song_service_1 = require("./song.service");
const database_service_1 = require("./services/database.service");
const search_service_1 = require("./services/search.service");
const download_service_1 = require("./services/download.service");
const telegram_bot_1 = require("../../../bots/telegram.bot");
const typeorm_1 = require("@nestjs/typeorm");
const song_entity_1 = require("../../../database/entities/song/song.entity");
const song_cache_entity_1 = require("../../../database/entities/song/song.cache.entity");
const song_metadata_entity_1 = require("../../../database/entities/song/song.metadata.entity");
const convert_util_1 = require("../../../utils/convert.util");
const song_like_entity_1 = require("../../../database/entities/song/song.like.entity");
const server_logger_1 = require("../../../server/server.logger");
let SongModule = class SongModule {
};
exports.SongModule = SongModule;
exports.SongModule = SongModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                song_entity_1.SongEntity,
                song_cache_entity_1.SongCacheEntity,
                song_metadata_entity_1.SongMetadataEntity,
                song_like_entity_1.SongLikeEntity,
            ]),
        ],
        controllers: [song_controller_1.SongController],
        providers: [
            song_service_1.SongService,
            database_service_1.SongDatabaseService,
            search_service_1.SongSearchService,
            download_service_1.SongDownloadService,
            telegram_bot_1.TelegramBot,
            convert_util_1.ConvertUtil,
            server_logger_1.ServerLogger,
        ],
        exports: [database_service_1.SongDatabaseService, search_service_1.SongSearchService],
    })
], SongModule);
//# sourceMappingURL=song.module.js.map