import { DataSource } from 'typeorm';
import { join } from 'path';
import { serverEnv } from 'src/server/server.env';

const entities = [
  join(__dirname, 'entities/user', '*.entity.{ts,js}'),
  join(__dirname, 'entities/song', '*.entity.{ts,js}'),
  join(__dirname, 'entities/playlist', '*.entity.{ts,js}'),
];

const dbDataSource = new DataSource({
  type: 'postgres',
  url: serverEnv.db_url,
  synchronize: false,
  migrationsTableName: 'typeorm_migrations',
  migrationsRun: false,
  entities,
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
});

export default dbDataSource;
