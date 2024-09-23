import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from './role.entity';
import { RoleController } from './role.controller';
import { RoleService } from './role.service';

@Module({
  imports: [RouterModule.forRoutes([{ path: '/role', module: RoleModule }]), TypeOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
  exports: [RoleService],
})
export class RoleModule {}
