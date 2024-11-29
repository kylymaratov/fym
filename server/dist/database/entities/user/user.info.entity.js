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
exports.UserInfoEntity = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
let UserInfoEntity = class UserInfoEntity {
};
exports.UserInfoEntity = UserInfoEntity;
__decorate([
    (0, typeorm_1.PrimaryColumn)({ unique: true, nullable: false }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "user_sub_id", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserInfoEntity.prototype, "about", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, (user) => user.user_info),
    __metadata("design:type", user_entity_1.UserEntity)
], UserInfoEntity.prototype, "user", void 0);
exports.UserInfoEntity = UserInfoEntity = __decorate([
    (0, typeorm_1.Entity)('user_info')
], UserInfoEntity);
//# sourceMappingURL=user.info.entity.js.map