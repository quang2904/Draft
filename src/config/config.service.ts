import { DynamicModule, Type, Injectable, Logger } from '@nestjs/common';
import { IPluginConfig, IApiServerOptions, IAssetOptions } from '@/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { getConfig } from './config-manager';
import { environment, IEnvironment } from './';

@Injectable()
export class ConfigService {
  public config: Partial<IPluginConfig>;
  private readonly environment = environment;
  private readonly logger: Logger = new Logger(ConfigService.name);

  constructor() {
    this.config = getConfig();

    for (const [key, value] of Object.entries(environment.env)) {
      process.env[key] = value;
    }
  }

  get apiConfigOptions(): IApiServerOptions {
    return this.config.apiConfigOptions;
  }

  get dbConnectionOptions(): TypeOrmModuleOptions {
    return this.config.dbConnectionOptions;
  }

  get plugins(): Array<DynamicModule | Type<any>> {
    return this.config.plugins;
  }

  get assetOptions(): Required<IAssetOptions> {
    return this.config.assetOptions;
  }

  get<T>(key: keyof IEnvironment): IEnvironment[keyof IEnvironment] {
    return this.environment[key] as T;
  }

  isProd(): boolean {
    return this.environment.production;
  }
}
