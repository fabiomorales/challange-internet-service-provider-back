import dotenv from 'dotenv';

dotenv.config();

const { NODE_ENV, PORT, DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASSWORD, DB_CLIENT, DB_POOL_MIN, DB_POOL_MAX } =
  process.env;

const env = {
  nodeEnv: String(NODE_ENV),
  port: String(PORT),
  dbHost: String(DB_HOST),
  dbPort: Number(DB_PORT),
  dbName: String(DB_NAME),
  dbUser: String(DB_USER),
  dbPassword: String(DB_PASSWORD),
  dbClient: String(DB_CLIENT),
  dbPoolMin: Number(DB_POOL_MIN),
  dbPoolMax: Number(DB_POOL_MAX),
};

export default env;
