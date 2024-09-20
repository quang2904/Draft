import chalk from 'chalk';
import { TlsOptions } from 'tls';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

let dbType: string;

if (process.env.DB_TYPE) dbType = process.env.DB_TYPE;
else dbType = 'sqlite';

console.log(`Selected DB Type (DB_TYPE env var): ${dbType}`);

// `process` is a built-in global in Node.js, no need to `require()`
console.log(chalk.magenta(`Currently running Node.js version %s`), process.version);

const ssl = process.env.DB_SSL_MODE === 'true' ? true : undefined;

let sslParams: TlsOptions;

if (ssl) {
  const base64data = process.env.DB_CA_CERT;
  const buff = Buffer.from(base64data, 'base64');
  const sslCert = buff.toString('ascii');

  sslParams = {
    rejectUnauthorized: true,
    ca: sslCert,
  };
}

const postgresConnectionOptions: PostgresConnectionOptions = {
  type: 'postgres',
  ssl: ssl ? sslParams : undefined,
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASS || 'postgres',
  database: process.env.DB_NAME || 'draft',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
  logging: 'all',
  logger: 'file', // Removes console logging, instead logs all queries in a file ormlogs.log
  synchronize: true,
  uuidExtension: 'pgcrypto',
  migrations: ['src/app/*.migration{.ts,.js}'],
  entities: ['src/app/*.entity{.ts,.js}'],
};

export const dbConnectionConfig = postgresConnectionOptions;
