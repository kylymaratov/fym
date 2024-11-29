"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PasswrodUtil = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
let PasswrodUtil = class PasswrodUtil {
    hashPassword(password, salt = 12) {
        return new Promise((resolve, reject) => {
            bcrypt
                .hash(password, salt)
                .then((hashedPassword) => {
                resolve(hashedPassword);
            })
                .catch((error) => reject(error));
        });
    }
    matchPassword(password, hashedPassword) {
        return new Promise((resolve, reject) => {
            bcrypt
                .compare(password, hashedPassword)
                .then((isMatch) => {
                resolve(isMatch);
            })
                .catch((error) => reject(error));
        });
    }
};
exports.PasswrodUtil = PasswrodUtil;
exports.PasswrodUtil = PasswrodUtil = __decorate([
    (0, common_1.Injectable)()
], PasswrodUtil);
//# sourceMappingURL=password.util.js.map