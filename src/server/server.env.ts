import { config } from 'dotenv';

config();

const db_host = process.env.DB_HOST || 'localhost';

interface ServerEnv {
  env: NodeJS.ProcessEnv;
  isProd: boolean;
  sv: 'v1';
  db_url: string;
  db_host: string;
}

const getDbURl = () => {
  if (process.env.MODE === 'production') {
    return `${process.env.DB_URL}@${db_host}:5432/songfiyapi`;
  } else {
    return `${process.env.DB_URL}@${db_host}:5432/songfiyapidev`;
  }
};

export const serverEnv: ServerEnv = {
  env: process.env,
  isProd: process.env.MODE === 'production',
  sv: 'v1',
  db_host,
  db_url: getDbURl(),
};
