"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setServerSession = void 0;
const session = require("express-session");
const pgSession = require("connect-pg-simple");
const pg = require("pg");
const server_env_1 = require("./server.env");
const cookieParser = require("cookie-parser");
const setServerSession = (app) => {
    const pgPool = new pg.Pool({
        connectionString: server_env_1.serverEnv.db_url,
    });
    const PgSession = pgSession(session);
    app.use(cookieParser());
    app.use(session({
        store: new PgSession({
            pool: pgPool,
            tableName: 'sessions',
            createTableIfMissing: true,
            ttl: 30 * 24 * 60 * 60,
        }),
        secret: process.env.SERCRET_KEY,
        resave: false,
        saveUninitialized: false,
        cookie: {
            path: '/',
            maxAge: 30 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            secure: server_env_1.serverEnv.isProd,
        },
    }));
};
exports.setServerSession = setServerSession;
//# sourceMappingURL=server.session.js.map