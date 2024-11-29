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
exports.AuthController = void 0;
const common_1 = require("@nestjs/common");
const server_env_1 = require("../../../server/server.env");
const local_auth_guard_1 = require("./guards/local.auth.guard");
const swagger_1 = require("@nestjs/swagger");
const login_dto_1 = require("./dto/login.dto");
const auth_service_1 = require("./auth.service");
const register_dto_1 = require("./dto/register.dto");
const user_decorator_1 = require("../../../decorators/user.decorator");
const user_entity_1 = require("../../../database/entities/user/user.entity");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    logoutUser(req, res) {
        req.logout((err) => {
            if (err)
                throw new common_1.InternalServerErrorException();
            req.session.destroy(() => {
                res.clearCookie('connect.sid');
                return res.status(200).json({
                    message: 'OK',
                });
            });
        });
    }
    async loginUser(req, res, user) {
        const { access_token, expiresInMilliseconds } = await this.authService.loginUser(req, user);
        res.cookie('access_token', access_token, {
            httpOnly: true,
            secure: server_env_1.serverEnv.isProd,
            maxAge: expiresInMilliseconds,
        });
        return res.json(user);
    }
    createUser(body) {
        return this.authService.createUser(body);
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, common_1.HttpCode)(200),
    (0, common_1.Get)('logout'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "logoutUser", null);
__decorate([
    (0, common_1.UseGuards)(local_auth_guard_1.LocalAuthGuard),
    (0, common_1.Post)('login'),
    (0, common_1.HttpCode)(200),
    (0, swagger_1.ApiBody)({ type: [login_dto_1.LoginDto] }),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, user_entity_1.UserEntity]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "loginUser", null);
__decorate([
    (0, swagger_1.ApiBody)({ type: [register_dto_1.RegisterDto] }),
    (0, common_1.Post)('register'),
    (0, common_1.HttpCode)(201),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [register_dto_1.RegisterDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "createUser", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('auth'),
    (0, common_1.Controller)(`/api/${server_env_1.serverEnv.sv}/auth`),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map