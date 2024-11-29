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
exports.UserDatabaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const database_provider_1 = require("../../../../database/database.provider");
const user_entity_1 = require("../../../../database/entities/user/user.entity");
const user_info_entity_1 = require("../../../../database/entities/user/user.info.entity");
const typeorm_2 = require("typeorm");
let UserDatabaseService = class UserDatabaseService {
    constructor(userRepository, userInfoRepository) {
        this.userRepository = userRepository;
        this.userInfoRepository = userInfoRepository;
    }
    async findUserById(id) {
        return await this.userRepository.findOne({ where: { id } });
    }
    async findUserBySubId(user_sub_id) {
        return await this.userRepository.findOne({ where: { user_sub_id } });
    }
    async findUserByEmail(email) {
        return await this.userRepository.findOne({ where: { email } });
    }
    async findUserWithRel(user, rel) {
        return await this.userRepository.findOne({
            where: { id: user.id, email: user.email },
            relations: rel,
        });
    }
    async findUserSessionsById(id) {
        const client = await database_provider_1.default.connect();
        const sessions = await client.query("SELECT * FROM sessions WHERE sess -> 'passport' ->> 'user' = $1", [id]);
        await database_provider_1.default.close();
        return sessions.map((session) => ({
            user_agent: session.sess.user_agent,
            secure: session.sess.cookie.secure,
            expire_date: session.sess.cookie.expires,
            user_ip: session.sess.user_ip,
        }));
    }
    async createUser(body) {
        const queryRunner = this.userRepository.manager.connection.createQueryRunner();
        await queryRunner.startTransaction();
        try {
            const user = this.userRepository.create(body);
            const savedUser = await queryRunner.manager.save(user);
            const user_info = this.userInfoRepository.create({
                user: savedUser,
                user_sub_id: savedUser.user_sub_id,
                name: body.name,
            });
            const savedUserInfo = await queryRunner.manager.save(user_info);
            savedUser.user_info = savedUserInfo;
            await queryRunner.commitTransaction();
            return savedUser;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
            throw error;
        }
        finally {
            await queryRunner.release();
        }
    }
};
exports.UserDatabaseService = UserDatabaseService;
exports.UserDatabaseService = UserDatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(user_info_entity_1.UserInfoEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], UserDatabaseService);
//# sourceMappingURL=database.service.js.map