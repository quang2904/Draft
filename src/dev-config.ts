import { DEFAULT_API_BASE_URL, DEFAULT_API_HOST, DEFAULT_API_PORT, IPluginConfig } from '@/common';
import { dbConnectionConfig, environment } from '@/config';

export const devConfig: IPluginConfig = {
  apiConfigOptions: {
    host: process.env.API_HOST || DEFAULT_API_HOST,
    port: process.env.API_PORT || DEFAULT_API_PORT,
    baseUrl: process.env.API_BASE_URL || DEFAULT_API_BASE_URL,
    middleware: [],
  },
  dbConnectionOptions: {
    migrationsTransactionMode: 'each', // Run migrations automatically in each transaction. i.e."all" | "none" | "each"
    migrationsRun: !environment.production, // Run migrations automatically, you can disable this if you prefer running migration manually.
    ...dbConnectionConfig,
  },
  plugins: [],
};
