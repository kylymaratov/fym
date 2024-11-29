"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const nodemailer_1 = require("nodemailer");
const googleapis_1 = require("googleapis");
const server_env_1 = require("../server/server.env");
const getGoogleAccessToken = async () => {
    const oAuth2Client = new googleapis_1.google.auth.OAuth2(server_env_1.serverEnv.env.GOOGLE_CLIENT_ID, server_env_1.serverEnv.env.GOOGLE_CLIENT_SECRET, 'https://developers.google.com/oauthplayground');
    console.log(server_env_1.serverEnv.env.GOOGLE_REFRESH_TOKEN, server_env_1.serverEnv.env.GOOGLE_CLIENT_ID, server_env_1.serverEnv.env.GOOGLE_CLIENT_SECRET);
    oAuth2Client.setCredentials({
        refresh_token: server_env_1.serverEnv.env.GOOGLE_REFRESH_TOKEN,
    });
    return await oAuth2Client.getAccessToken();
};
const sendMessage = async () => {
    console.log(await getGoogleAccessToken());
    const transporter = nodemailer_1.default.createTransport({});
};
exports.sendMessage = sendMessage;
//# sourceMappingURL=index.js.map