import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User, UserService } from '@/app/user';
import { AuthService } from './auth.service';
import { CqrsModule } from '@nestjs/cqrs';
import { RoleModule } from '@/app/role';

@Module({
  imports: [forwardRef(() => TypeOrmModule.forFeature([User])), forwardRef(() => RoleModule), CqrsModule],
  controllers: [AuthController],
  providers: [AuthService, UserService],
  exports: [AuthService],
})
export class AuthModule {}
