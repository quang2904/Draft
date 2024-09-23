import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { UserService } from './user.service';

@ApiTags('User')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}
}
