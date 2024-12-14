import nodemailer from 'nodemailer';
import { google } from 'googleapis';
import { serverEnv } from 'src/server/server.env';

const getGoogleAccessToken = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    serverEnv.env.GOOGLE_CLIENT_ID,
    serverEnv.env.GOOGLE_CLIENT_SECRET,
    'https://developers.google.com/oauthplayground',
  );
  console.log(
    serverEnv.env.GOOGLE_REFRESH_TOKEN,
    serverEnv.env.GOOGLE_CLIENT_ID,
    serverEnv.env.GOOGLE_CLIENT_SECRET,
  );

  oAuth2Client.setCredentials({
    refresh_token: serverEnv.env.GOOGLE_REFRESH_TOKEN,
  });

  return await oAuth2Client.getAccessToken();
};

export const sendMessage = async () => {
  console.log(await getGoogleAccessToken());
  const transporter = nodemailer.createTransport({});
};
