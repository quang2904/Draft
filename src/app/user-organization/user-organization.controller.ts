import { Controller, HttpStatus, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CrudController } from '../core/crud/crud.controller';
import { UserOrganization as IUserOrganization } from '@/contracts';
import { UserOrganizationService } from './user-organization.services';
import { IPagination } from '../core';
import { UserOrganization } from './user-organization.entity';

@ApiTags('UserOrganization')
@Controller()
export class UserOrganizationController extends CrudController<IUserOrganization> {
  constructor(private readonly userOrganizationService: UserOrganizationService) {
    super(userOrganizationService);
  }

  @ApiOperation({ summary: 'Find one from the search input' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found user organization', type: UserOrganization })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @Get()
  async findOne(@Query('findInputStr') findInputStr: string): Promise<IUserOrganization> {
    const findInput = JSON.parse(findInputStr);
    return null;
  }
}
