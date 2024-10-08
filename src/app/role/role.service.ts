import { Role } from './role.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '@/app/core';

@Injectable()
export class RoleService extends CrudService<Role> {
  constructor(
    @InjectRepository(Role)
    private readonly tenantRepository: Repository<Role>,
  ) {
    super(tenantRepository);
  }
}
