import { config } from 'dotenv';

config();

interface ServerEnv {
  env: NodeJS.ProcessEnv;
  isProd: boolean;
  sv: 'v1';
  dbUrl: string;
}

const getDbURl = () => {
  if (process.env.NODE_ENV === 'production') {
    return process.env.DB_URL + 'songfiyapi';
  } else {
    return process.env.DB_URL + 'songfiyapidev';
  }
};

export const serverEnv: ServerEnv = {
  env: process.env,
  isProd: process.env.NODE_ENV === 'production',
  sv: 'v1',
  dbUrl: getDbURl(),
};
