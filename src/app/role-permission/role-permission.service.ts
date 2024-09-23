import { RolePermission } from './role-permission.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '@/app/core';

@Injectable()
export class RolePermissionService extends CrudService<RolePermission> {
  constructor(
    @InjectRepository(RolePermission)
    private readonly rolePermissionRepository: Repository<RolePermission>,
  ) {
    super(rolePermissionRepository);
  }
}
