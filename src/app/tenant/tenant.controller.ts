import { ApiTags } from '@nestjs/swagger';
import { Controller, Get } from '@nestjs/common';
import { TenantService } from './tenant.service';
import { RequestContext } from '../core/context';
import { ITenant } from '@/contracts';

@ApiTags('Tenant')
@Controller('tenant')
export class TenantController {
  constructor(private readonly tenantService: TenantService) {}

  @Get()
  async findById(): Promise<ITenant> {
    return await this.tenantService.findOneByIdString(RequestContext.currentTenantId());
  }
}
