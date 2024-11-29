"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.serverEnv = void 0;
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const db_host = process.env.DB_HOST || 'localhost';
const getDbURl = () => {
    if (process.env.MODE === 'production') {
        return `${process.env.DB_URL}@${db_host}:5432/songfiyapi`;
    }
    else {
        return `${process.env.DB_URL}@${db_host}:5432/songfiyapidev`;
    }
};
exports.serverEnv = {
    env: process.env,
    isProd: process.env.MODE === 'production',
    sv: 'v1',
    db_host,
    db_url: getDbURl(),
};
//# sourceMappingURL=server.env.js.map