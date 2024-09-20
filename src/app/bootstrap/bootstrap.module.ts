import { MiddlewareConsumer, Module, NestModule, OnApplicationShutdown } from '@nestjs/common';
import { ConfigModule } from '@/config';
import { AppModule } from '@/app/app.module';
import { SharedModule } from '@/app/shared';

@Module({
  imports: [ConfigModule, AppModule, SharedModule],
})
export class BootstrapModule implements NestModule, OnApplicationShutdown {
  constructor() {}

  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes('*');
  }

  async onApplicationShutdown(signal: string) {
    if (signal) {
      console.log(`Received shutdown signal: ${signal}`);
    }
  }
}
