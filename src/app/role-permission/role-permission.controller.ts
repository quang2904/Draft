import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RolePermissionService } from './role-permission.service';

@ApiTags('RolePermission')
@Controller()
export class RolePermissionController {
  constructor(private readonly tenantService: RolePermissionService) {}
}
