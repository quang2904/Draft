import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { UserModule, UserService } from '@/app/user';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleModule } from '@/app/role';
import { CommandHandlers } from './commands/handlers';
import { SocialAuthModule } from '@/auth';
import { ConfigService } from '@/config';

@Module({
  imports: [
    SocialAuthModule.registerAsync({
      imports: [AuthModule, UserModule, RoleModule, CqrsModule],
      useClass: AuthService,
    }),
    UserModule,
    RoleModule,
    CqrsModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ConfigService, ...CommandHandlers],
  exports: [AuthService],
})
export class AuthModule {}
