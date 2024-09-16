import { Controller, HttpStatus, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CrudController } from '../core/crud/crud.controller';
import { User } from './user.entity';
import { UUIDValidationPipe } from '../shared';

@ApiTags('User')
@Controller()
export class UserController extends CrudController<User> {
  constructor(private readonly userService: UserService) {
    super(userService);
  }

  @ApiOperation({ summary: 'Find User by id.' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Found one record', type: User })
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: 'Record not found' })
  @Get(':id')
  async findById(@Param('id', UUIDValidationPipe) id: string): Promise<User> {
    return null;
  }
}
