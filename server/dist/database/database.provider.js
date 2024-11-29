"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const path_1 = require("path");
const server_env_1 = require("../server/server.env");
const entities = [
    (0, path_1.join)(__dirname, 'entities/user', '*.entity.{ts,js}'),
    (0, path_1.join)(__dirname, 'entities/song', '*.entity.{ts,js}'),
    (0, path_1.join)(__dirname, 'entities/playlist', '*.entity.{ts,js}'),
];
const dbDataSource = new typeorm_1.DataSource({
    type: 'postgres',
    url: server_env_1.serverEnv.db_url,
    synchronize: false,
    migrationsTableName: 'typeorm_migrations',
    migrationsRun: false,
    entities,
    migrations: [(0, path_1.join)(__dirname, 'migrations', '*.{ts,js}')],
});
exports.default = dbDataSource;
//# sourceMappingURL=database.provider.js.map