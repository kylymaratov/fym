"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentSession = void 0;
const common_1 = require("@nestjs/common");
exports.CurrentSession = (0, common_1.createParamDecorator)((data, context) => {
    const request = context.switchToHttp().getRequest();
    return request.session;
});
//# sourceMappingURL=session.decorator.js.map