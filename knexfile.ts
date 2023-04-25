import env from './src/config/env';
import { Knex } from 'knex';

export default {
  client: env.dbClient,
  connection: {
    host: env.dbHost,
    port: env.dbPort,
    database: env.dbName,
    user: env.dbUser,
    password: env.dbPassword,
  },
  pool: {
    min: env.dbPoolMin,
    max: env.dbPoolMax,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory:
      env.nodeEnv === 'production' ? './dist/shared/infra/knexorm/migrations' : './src/shared/infra/knexorm/migrations',
    extension: 'ts',
  },
} as Knex.Config;
