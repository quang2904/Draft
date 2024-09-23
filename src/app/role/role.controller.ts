import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { RoleService } from './role.service';

@ApiTags('Role')
@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
}
