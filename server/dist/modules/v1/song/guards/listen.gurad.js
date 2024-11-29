"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListneSongGuard = void 0;
class ListneSongGuard {
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        if (request.isAuthenticated())
            return true;
        return true;
    }
}
exports.ListneSongGuard = ListneSongGuard;
//# sourceMappingURL=listen.gurad.js.map