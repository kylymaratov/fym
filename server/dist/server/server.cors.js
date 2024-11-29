"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setServerCors = void 0;
const server_env_1 = require("./server.env");
const hosts = ['http://localhost:5173'];
const prosHosts = ['http://localhost:3000'];
const setServerCors = (app) => {
    app.enableCors({
        origin: server_env_1.serverEnv.isProd ? prosHosts : hosts,
        methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
        credentials: true,
    });
};
exports.setServerCors = setServerCors;
//# sourceMappingURL=server.cors.js.map