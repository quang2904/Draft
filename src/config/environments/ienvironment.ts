import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { CurrenciesEnum, DefaultUser, DefaultValueDateTypeEnum } from '@/contracts';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * environment variables that goes into process.env
 */
export interface Env {
  LOG_LEVEL?: LogLevel;

  [key: string]: string;
}

/**
 * Server Environment
 */
export interface IEnvironment {
  production: boolean;
  envName: string;

  env?: Env;
  clientBaseUrl: string;
  USER_PASSWORD_BCRYPT_SALT_ROUNDS?: number;
  JWT_SECRET?: string;

  database: TypeOrmModuleOptions;

  defaultAdmins: DefaultUser[];

  defaultEmployees?: DefaultUser[];

  defaultOrganization?: {
    name: string;
    currency: CurrenciesEnum;
    defaultValueDateType: DefaultValueDateTypeEnum;
    imageUrl: string;
  };
}
