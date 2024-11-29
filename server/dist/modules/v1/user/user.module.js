"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModule = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_controller_1 = require("./user.controller");
const typeorm_1 = require("@nestjs/typeorm");
const database_service_1 = require("./services/database.service");
const user_entity_1 = require("../../../database/entities/user/user.entity");
const user_info_entity_1 = require("../../../database/entities/user/user.info.entity");
const song_module_1 = require("../song/song.module");
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = __decorate([
    (0, common_1.Module)({
        imports: [song_module_1.SongModule, typeorm_1.TypeOrmModule.forFeature([user_entity_1.UserEntity, user_info_entity_1.UserInfoEntity])],
        controllers: [user_controller_1.UserController],
        providers: [user_service_1.UserService, database_service_1.UserDatabaseService],
        exports: [database_service_1.UserDatabaseService],
    })
], UserModule);
//# sourceMappingURL=user.module.js.map