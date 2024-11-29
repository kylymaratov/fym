"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setServerPassport = void 0;
const passport = require("passport");
const setServerPassport = (app) => {
    app.use(passport.initialize());
    app.use(passport.session());
};
exports.setServerPassport = setServerPassport;
//# sourceMappingURL=server.passport.js.map