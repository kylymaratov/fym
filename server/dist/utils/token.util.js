"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenUtil = void 0;
const common_1 = require("@nestjs/common");
const jsonwebtoken_1 = require("jsonwebtoken");
const server_env_1 = require("../server/server.env");
let TokenUtil = class TokenUtil {
    getToken(data = {}, exp = '1d') {
        return new Promise((resolve, reject) => {
            jsonwebtoken_1.default.sign(data, server_env_1.serverEnv.env.TOKEN_SECRET, { expiresIn: exp }, (error, token) => {
                if (error)
                    return reject(error);
                resolve(token);
            });
        });
    }
    decodeToken(token) {
        return new Promise((resolve) => {
            jsonwebtoken_1.default.verify(token, server_env_1.serverEnv.env.TOKEN_SECRET, (error, decoded) => {
                if (error)
                    return resolve(null);
                resolve(decoded);
            });
        });
    }
};
exports.TokenUtil = TokenUtil;
exports.TokenUtil = TokenUtil = __decorate([
    (0, common_1.Injectable)()
], TokenUtil);
//# sourceMappingURL=token.util.js.map