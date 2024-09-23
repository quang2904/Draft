import { Tenant } from './tenant.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudService } from '@/app/core';

@Injectable()
export class TenantService extends CrudService<Tenant> {
  constructor(
    @InjectRepository(Tenant)
    private readonly tenantRepository: Repository<Tenant>,
  ) {
    super(tenantRepository);
  }
}
