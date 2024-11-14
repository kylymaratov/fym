import { config } from 'dotenv';

config();

const dbHost =
  process.env.NODE_ENV === 'production' ? 'host.docker.internal' : 'localhost';

interface ServerEnv {
  env: NodeJS.ProcessEnv;
  isProd: boolean;
  sv: 'v1';
  dbUrl: string;
  dbHost: string;
}

const getDbURl = () => {
  if (process.env.NODE_ENV === 'production') {
    return `${process.env.DB_URL}@${dbHost}:5432/songfiyapi`;
  } else {
    return `${process.env.DB_URL}@${dbHost}:5432/songfiyapidev`;
  }
};

export const serverEnv: ServerEnv = {
  env: process.env,
  isProd: process.env.NODE_ENV === 'production',
  sv: 'v1',
  dbHost,
  dbUrl: getDbURl(),
};
