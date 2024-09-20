import { ConflictException, INestApplication, Type } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import chalk from 'chalk';
import { json, urlencoded } from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { IPluginConfig } from '@/common';
import { SharedModule } from '@/app/shared';
import { getConfig, setConfig } from '@/config';
import { join } from 'path';
import { coreEntities } from '@/app/core/entities';
import { getEntitiesFromPlugins } from '@/plugin';

export async function bootstrap(pluginConfig?: Partial<IPluginConfig>): Promise<INestApplication> {
  const config = await registerPluginConfig(pluginConfig);

  const { BootstrapModule } = await import('./bootstrap.module');
  const app = await NestFactory.create<NestExpressApplication>(BootstrapModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // This will lock all routes and make them accessible by authenticated users only.

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
    allowedHeaders:
      'Authorization, Language, Tenant-Id, Organization-Id, X-Requested-With, X-Auth-Token, X-HTTP-Method-Override, Content-Type, Content-Language, Accept, Accept-Language, Observe',
  });

  app.use(helmet());
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const options = new DocumentBuilder().setTitle('Gauzy API').setVersion('1.0').addBearerAuth().build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('swg', app, document);

  let { port, host } = config.apiConfigOptions;
  if (!port) {
    port = 3000;
  }
  if (!host) {
    host = '0.0.0.0';
  }

  console.log(chalk.green(`Configured Host: ${host}`));
  console.log(chalk.green(`Configured Port: ${port}`));

  console.log(chalk.green(`Swagger UI available at http://${host}:${port}/swg`));

  /**
   * Dependency injection with class-validator
   */
  useContainer(app.select(SharedModule), { fallbackOnErrors: true });

  // Configure Atlassian Connect Express
  // const addon = ac(express());
  // app.use(addon.middleware());

  await app.listen(port, host, () => {
    const message = `Listening at http://${host}:${port}/${globalPrefix}`;
    console.log(chalk.magenta(message));
    // Send message to parent process (desktop app)
    if (process.send) {
      process.send(message);
    }
  });

  return app;
}

/**
 * Returns an array of core entities and any additional entities defined in plugins.
 */
export async function registerAllEntities(pluginConfig: Partial<IPluginConfig>) {
  const allEntities = coreEntities as Array<Type<any>>;
  const pluginEntities = getEntitiesFromPlugins(pluginConfig.plugins);

  for (const pluginEntity of pluginEntities) {
    if (allEntities.find((e) => e.name === pluginEntity.name)) {
      throw new ConflictException({
        message: `error.${pluginEntity.name} conflict by default entities`,
      });
    } else {
      allEntities.push(pluginEntity);
    }
  }
  return allEntities;
}

export async function registerPluginConfig(pluginConfig: Partial<IPluginConfig>) {
  if (Object.keys(pluginConfig).length > 0) {
    setConfig(pluginConfig);
  }

  /**
   * Configure migration settings
   */
  setConfig({
    dbConnectionOptions: {
      ...getMigrationsSetting(),
    },
  });

  console.log(chalk.green(`DB Config: ${JSON.stringify(getConfig().dbConnectionOptions)}`));

  /**
   * Registered core & plugins entities
   */
  const entities = await registerAllEntities(pluginConfig);
  setConfig({
    dbConnectionOptions: {
      entities,
    },
  });

  return getConfig();
}

/**
 * GET migrations directory & CLI paths
 *
 * @returns
 */
export function getMigrationsSetting() {
  console.log(`Reporting __dirname: ${__dirname}`);

  return {
    migrations: [
      // join(__dirname, '../../src/database/migrations/*{.ts,.js}'),
      join(__dirname, '../database/migrations/*{.ts,.js}'),
    ],
    cli: {
      migrationsDir: join(__dirname, '../../src/database/migrations'),
    },
  };
}
