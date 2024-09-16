import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CrudController } from '../core/crud/crud.controller';
import { OrganizationDepartment } from './organization-department.entity';
import { OrganizationDepartmentService } from './organization-department.service';

@ApiTags('Organization-Department')
@Controller()
export class OrganizationDepartmentController extends CrudController<OrganizationDepartment> {
  constructor(private readonly organizationDepartmentService: OrganizationDepartmentService) {
    super(organizationDepartmentService);
  }
}
