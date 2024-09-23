import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { AppService } from '@/app/app.service';
import { AppController } from '@/app/app.controller';
import { CoreModule } from '@/app/core';

@Module({
  imports: [MulterModule.register(), CoreModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {
  constructor() {}
}
