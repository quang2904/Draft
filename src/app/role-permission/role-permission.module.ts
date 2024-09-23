import { Module } from '@nestjs/common';
import { RouterModule } from 'nest-router';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolePermissionController } from './role-permission.controller';
import { RolePermissionService } from './role-permission.service';
import { RolePermission } from './role-permission.entity';

@Module({
  imports: [
    RouterModule.forRoutes([
      {
        path: '/role-permission',
        module: RolePermissionModule,
      },
    ]),
    TypeOrmModule.forFeature([RolePermission]),
  ],
  controllers: [RolePermissionController],
  providers: [RolePermissionService],
  exports: [RolePermissionService],
})
export class RolePermissionModule {}
