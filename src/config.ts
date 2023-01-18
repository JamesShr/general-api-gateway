import config from 'config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm/dist';
import path from 'path';

export const INFO_VERSION = config.get('version') as string;

// port
export const PORT_HTTP = config.get('port.http') as number;

// redis
export const REDIS_HOST = config.get('redis.host') as string;

export const REDIS_PORT = config.get('redis.port') as number;

export const REDIS_DB = config.get('redis.db') as number;

export const REDIS_PASSWORD = config.get('redis.password') as string;

export const REDIS_URL =
  REDIS_PASSWORD.length > 0
    ? `redis://:${REDIS_PASSWORD}@${REDIS_HOST}:${REDIS_PORT}`
    : `redis://${REDIS_HOST}:${REDIS_PORT}`;

// ormconfig
export const ormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: config.get('timescale.host'),
  port: config.get('timescale.port'),
  username: config.get('timescale.username'),
  password: config.get('timescale.password'),
  database: config.get('timescale.database'),
  schema: config.get('timescale.schema'),
  entities: [path.join(__dirname, 'entities/*.entity.js')],
  logging: process.env.NODE_ENV === 'development',
  cache: {
    type: 'redis',
    options: {
      url: REDIS_URL,
    },
    duration: 1000 * 60 * 60 * 24,
  }
};