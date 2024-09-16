import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ILogger } from './ILogger';
import { DynamicModule, Type } from '@nestjs/common';

export interface IApiServerOptions {
  host?: string;
  port: number | string;
  baseUrl?: string;
  middleware?: any;
}

export interface IAuthOptions {
  expressSessionSecret: string;
  userPasswordBcryptSaltRounds: number;
  jwtSecret: string;
}

export interface IAssetOptions {
  assetPath: string;
  assetPublicPath: string;
}

export interface IPluginConfig {
  apiConfigOptions: IApiServerOptions;
  dbConnectionOptions: TypeOrmModuleOptions;
  plugins?: Array<DynamicModule | Type<any>>;
  logger?: ILogger;
  authOptions?: IAuthOptions;
  assetOptions?: IAssetOptions;
}
